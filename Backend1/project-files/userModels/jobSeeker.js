const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../AuthModels/auth');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');



// Configure AWS SDK v3 client
const s3Client = new S3Client({
  region: 'us-east-1', // Replace with your AWS region
  credentials: {
    accessKeyId: 'AKIATCKATQQQNTCTPH3U', // Replace with your AWS access key ID
    secretAccessKey: '6l/NdnuDWjnhnW+2T+vHm/XzLJ3nyNhVZKdRoPUy' // Replace with your AWS secret access key
  }
});

// Multer upload configuration for S3
const uploadCV = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: 'ali001', // Replace with your S3 bucket name
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
}).single('cv'); // 'cv' should match the name attribute of the file input in your frontend form

router.post('/apply', verifyToken, uploadCV, (req, res) => {
  const { first_name, last_name, email, position, job_id } = req.body; // Access form data sent from frontend

  // Access the file path from the uploaded CV
  const cv_path = req.file.location;

  // Insert job application into database
  const insertQuery = 'INSERT INTO applications (user_id, first_name, last_name, email, position, cv_path, job_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(insertQuery, [req.userId, first_name, last_name, email, position, cv_path, job_id], (err, result) => {
    if (err) {
      console.error('Error applying for job:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(201).json({ message: 'Job application submitted successfully' });
  });
});

// View Job Applications route
router.get('/applications', verifyToken, (req, res) => {
  const user_id = req.userId;

  // Query to fetch job applications for the current user
  const selectQuery = 'SELECT * FROM applications WHERE user_id = ?';
  db.query(selectQuery, [user_id], (err, applications) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(applications);
  });
});

// Cancel Job Application route
router.delete('/applications/:application_id', verifyToken, (req, res) => {
  const applicationId = req.params.application_id;
  const user_id = req.userId;

  // Delete job application from database
  const deleteQuery = 'DELETE FROM applications WHERE application_id = ? AND user_id = ?';
  db.query(deleteQuery, [applicationId, user_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Application not found or unauthorized' });
    }
    res.json({ message: 'Job application canceled successfully' });
  });
});

module.exports = router;
