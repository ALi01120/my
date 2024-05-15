const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../AuthModels/auth');

// Middleware to validate job data
const validateJobData = (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }
  next();
};

router.get('/jobs', verifyToken, async (req, res) => {
  const userId = req.userId; // Get the ID of the authenticated user

  try {
    const sql = 'SELECT * FROM jobs WHERE employer_id = ?'; // Modify the query to filter by user ID
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching jobs:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ jobs: results });
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/jobs', verifyToken, validateJobData, async (req, res) => {
  const { title, description, category, country, city, location, expiry_date, job_timing, salary } = req.body;
  const employerId = req.userId; // Get the ID of the authenticated user

  try {
    const sql = 'INSERT INTO jobs (title, description, category, country, city, location, expiry_date, job_timing, salary, employer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, description, category, country, city, location, expiry_date, job_timing, salary, employerId], (err, result) => {
      if (err) {
        console.error('Error creating job:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Job created successfully', jobId: result.insertId });
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch all jobs endpoint
router.get('/Alljobs', verifyToken, async (req, res) => {
  try {
    const sql = 'SELECT * FROM jobs';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching jobs: ', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ jobs: results });
    });
  } catch (error) {
    console.error('Error fetching jobs: ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/jobs/:jobId', verifyToken, validateJobData, async (req, res) => {
  const { jobId } = req.params;
  const { title, description, category, country, city, location, expiry_date, job_timing, salary } = req.body;

  try {
    const sql = 'UPDATE jobs SET title=?, description=?, category=?, country=?, city=?, location=?, expiry_date=?, job_timing=?, salary=? WHERE job_id=? AND employer_id=?';
    db.query(sql, [title, description, category, country, city, location, expiry_date, job_timing, salary, jobId, req.userId], (err, result) => {
      if (err) {
        console.error('Error updating job:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
        // If no rows were affected, it means the user is not authorized to update this job
        return res.status(403).json({ error: 'Unauthorized to update this job' });
      }
      res.status(200).json({ message: 'Job updated successfully' });
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/jobs/:jobId', verifyToken, async (req, res) => {
  const { jobId } = req.params;

  try {
    const sql = 'DELETE FROM jobs WHERE job_id=? AND employer_id=?';
    db.query(sql, [jobId, req.userId], (err, result) => {
      if (err) {
        console.error('Error deleting job:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
        // If no rows were affected, it means the user is not authorized to delete this job
        return res.status(403).json({ error: 'Unauthorized to delete this job' });
      }
      res.status(200).json({ message: 'Job deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/client/applications', verifyToken, async (req, res) => {
  const employerId = req.userId; // Get the ID of the authenticated client

  try {
    const sql = `
      SELECT a.*, j.title AS job_title, u.username AS applicant_username, u.email AS applicant_email, u.gender AS applicant_gender, u.age AS applicant_age, a.cv_path AS applicant_cv_path
      FROM applications a
      INNER JOIN jobs j ON a.job_id = j.job_id
      INNER JOIN users u ON a.user_id = u.id
      WHERE j.employer_id = ?
    `;
    db.query(sql, [employerId], (err, applications) => {
      if (err) {
        console.error('Error fetching job applications:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ applications });
    });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
