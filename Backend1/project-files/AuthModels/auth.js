// auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();
const { jwtSecret } = require('../config');

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ error: 'Token not provided' });
  }
  jwt.verify(token.split(' ')[1], jwtSecret, (err, decoded) => {
    if (err) {
      console.error('Error verifying token: ', err);
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
};

// Middleware to check role authorization
const authorizeRole = (role) => (req, res, next) => {
  if (req.role !== role) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
};

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password, gender, age, role } = req.body; 
  try {
    // Check if the provided role is valid
    if (!['Administrator', 'Student', 'Job Seeker', 'Client'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const sql = 'INSERT INTO users (username, email, password, gender, age, role) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [username, email, hashedPassword, gender, age, role], (err, result) => {
      if (err) {
        console.error('Error registering user: ', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  } catch (error) {
    console.error('Error registering user: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('Error logging in: ', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password' });
      return;
    }
    const user = results[0];
    try {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token, role: user.role });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error comparing passwords: ', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});


// Fetch user profile endpoint
// Fetch user profile endpoint
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.userId; // Extract user ID from decoded token

    // Query the database to fetch user profile information including image URL
    const sql = 'SELECT id, username, email, gender, age, role, profile_image FROM users WHERE id = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching user profile: ', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'User profile not found' });
      }
      const userProfile = results[0];

      // Assuming profile_image holds URL, construct full URL if it's not null
      if (userProfile.profile_image) {
        userProfile.profile_image = userProfile.profile_image; // Make sure the URL is stored correctly
      }

      // Return the user profile including image URL
      res.status(200).json({ userProfile });
    });
  } catch (error) {
    console.error('Error fetching user profile: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Configure AWS SDK v3 client
const s3Client = new S3Client({
  region: 'us-east-1', // Replace with your AWS region
  credentials: {
    accessKeyId: 'AKIATCKATQQQNTCTPH3U', // Replace with your AWS access key ID
    secretAccessKey: '6l/NdnuDWjnhnW+2T+vHm/XzLJ3nyNhVZKdRoPUy' // Replace with your AWS secret access key
  }
});

// Multer upload configuration for S3
// Multer upload configuration for S3 with AWS SDK v3
const upload = multer({
  storage: multerS3({
    s3: s3Client, // Use the AWS SDK v3 client
    bucket: 'ali001', // Replace 'your-bucket-name' with your S3 bucket name
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
});

// Update user profile endpoint with image upload
router.put('/profile', verifyToken, upload.single('image'), async (req, res) => {
  const { userId } = req;
  const { username, email, gender, age } = req.body;
  const imageUrl = req.file ? req.file.location : null; // Get the uploaded image URL

  try {
    // Update user profile in the database
    const sql = 'UPDATE users SET username=?, email=?, gender=?, age=?, profile_image=? WHERE id=?';
    db.query(sql, [username, email, gender, age, imageUrl, userId], (err, result) => {
      if (err) {
        console.error('Error updating user profile: ', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ message: 'User profile updated successfully' });
    });
  } catch (error) {
    console.error('Error updating user profile: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = { router, verifyToken, authorizeRole };
