const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db');

// Fetch data
router.get('/data', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching data: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

// Delete data
router.delete('/data/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
    if (err) {
      console.error('Error deleting data: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Data deleted successfully' });
  });
});

// Update data
router.put('/data/:id', (req, res) => {
  const id = req.params.id;
  const { username, email, age, gender, password, role } = req.body;
  const values = [username, email, age, gender, password, role, id];
  db.query('UPDATE users SET username = ?, email = ?, age = ?, gender = ?, password = ?, role = ? WHERE id = ?', values, (err, result) => {
    if (err) {
      console.error('Error updating data: ' + err.stack);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json({ message: 'Data updated successfully' });
  });
});
// Create data
router.post('/data', (req, res) => {
  const { username, email, age, gender, password, role } = req.body;
  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password: ' + err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    // Insert user data into the database with hashed password
    const values = [username, email, age, gender, hashedPassword, role];
    db.query('INSERT INTO users (username, email, age, gender, password, role) VALUES (?, ?, ?, ?, ?, ?)', values, (err, result) => {
      if (err) {
        console.error('Error creating data: ' + err.stack);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ message: 'Data created successfully' });
    });
  });
});

module.exports = { router };
