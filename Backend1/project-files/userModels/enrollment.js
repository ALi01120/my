const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../AuthModels/auth');

// Enroll in Course route
router.post('/enroll', verifyToken, (req, res) => {
  const { course_id } = req.body;
  const user_id = req.userId;

  // Check if the student has already enrolled in this course
  const checkQuery = 'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?';
  db.query(checkQuery, [user_id, course_id], (err, existingEnrollments) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (existingEnrollments.length > 0) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    // Insert enrollment into database
    const insertQuery = 'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)';
    db.query(insertQuery, [user_id, course_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      res.status(201).json({ message: 'Enrolled in course successfully' });
    });
  });
});

// View Enrollments route
router.get('/enrollments', verifyToken, (req, res) => {
  const user_id = req.userId;

  // Query to fetch enrollments for the current user
  const selectQuery = 'SELECT * FROM enrollments WHERE user_id = ?';
  db.query(selectQuery, [user_id], (err, enrollments) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    res.json(enrollments);
  });
});

// Withdraw from Course route
router.delete('/enrollments/:enrollment_id/withdraw', verifyToken, (req, res) => {
  const enrollmentId = req.params.enrollment_id;
  const user_id = req.userId;

  // Delete enrollment from database
  const deleteQuery = 'DELETE FROM enrollments WHERE enrollment_id = ? AND user_id = ?';
  db.query(deleteQuery, [enrollmentId, user_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    res.json({ message: 'Withdrawn from course successfully' });
  });
});

module.exports = router;
