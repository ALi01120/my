const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../AuthModels/auth');

// Middleware to validate course data
const validateCourseData = (req, res, next) => {
  const { title, description, instructor_name, start_date, end_date } = req.body;
  if (!title || !description || !instructor_name || !start_date || !end_date) {
    return res.status(400).json({ error: 'Title, description, instructor name, start date, and end date are required' });
  }
  next();
};


router.get('/courses', verifyToken, async (req, res) => {
  try {
    const sql = 'SELECT * FROM courses';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching courses:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ courses: results });
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/courses', verifyToken, validateCourseData, async (req, res) => {
  const { title, description, instructor_name, start_date, end_date } = req.body;
  const instructorId = req.userId; // Get the ID of the authenticated user

  try {
    const sql = 'INSERT INTO courses (title, description, instructor_id, instructor_name, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, description, instructorId, instructor_name, start_date, end_date], (err, result) => {
      if (err) {
        console.error('Error creating course:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Course created successfully', courseId: result.insertId });
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch lessons for a specific course
router.get('/lessons/:courseId', verifyToken, async (req, res) => {
  const { courseId } = req.params;

  try {
    const sql = 'SELECT * FROM lessons WHERE course_id = ?';
    db.query(sql, [courseId], (err, results) => {
      if (err) {
        console.error('Error fetching lessons:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ lessons: results });
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/lessons', verifyToken, async (req, res) => {
  const { title, content, courseId } = req.body; // Change course_id to courseId

  try {
    const sql = 'INSERT INTO lessons (title, content, course_id) VALUES (?, ?, ?)';
    db.query(sql, [title, content, courseId], (err, result) => { // Change course_id to courseId
      if (err) {
        console.error('Error creating lesson:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Lesson created successfully', lessonId: result.insertId });
    });
  } catch (error) {
    console.error('Error creating lesson:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// DELETE course
router.delete('/courses/:courseId', verifyToken, async (req, res) => {
  const { courseId } = req.params;

  try {
    const sql = 'DELETE FROM courses WHERE course_id = ?';
    db.query(sql, [courseId], (err, result) => {
      if (err) {
        console.error('Error deleting course:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ message: 'Course deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE course
router.put('/courses/:courseId', verifyToken, validateCourseData, async (req, res) => {
  const { courseId } = req.params;
  const { title, description, instructor_name, start_date, end_date } = req.body;

  try {
    const sql = 'UPDATE courses SET title = ?, description = ?, instructor_name = ?, start_date = ?, end_date = ? WHERE course_id = ?';
    db.query(sql, [title, description, instructor_name, start_date, end_date, courseId], (err, result) => {
      if (err) {
        console.error('Error updating course:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ message: 'Course updated successfully' });
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE lesson
router.delete('/lessons/:lessonId', verifyToken, async (req, res) => {
  const { lessonId } = req.params;

  try {
    const sql = 'DELETE FROM lessons WHERE lesson_id = ?';
    db.query(sql, [lessonId], (err, result) => {
      if (err) {
        console.error('Error deleting lesson:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ message: 'Lesson deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE lesson
router.put('/lessons/:lessonId', verifyToken, async (req, res) => {
  const { lessonId } = req.params;
  const { title, content } = req.body;

  try {
    const sql = 'UPDATE lessons SET title = ?, content = ? WHERE lesson_id = ?';
    db.query(sql, [title, content, lessonId], (err, result) => {
      if (err) {
        console.error('Error updating lesson:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ message: 'Lesson updated successfully' });
    });
  } catch (error) {
    console.error('Error updating lesson:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});












router.get('/enrollments', verifyToken, async (req, res) => {
  const userId = req.userId; // Get the ID of the authenticated user

  try {
    const sql = 'SELECT * FROM enrollments WHERE user_id = ?';
    db.query(sql, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching enrollments:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(200).json({ enrollments: results });
    });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/enrollments', verifyToken, async (req, res) => {
  const { course_id } = req.body;
  const userId = req.userId; // Get the ID of the authenticated user

  try {
    // Fetch the instructor name and title associated with the course
    const fetchCourseInfoQuery = 'SELECT instructor_name, title FROM courses WHERE course_id = ?';
    db.query(fetchCourseInfoQuery, [course_id], (err, results) => {
      if (err) {
        console.error('Error fetching course information:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      
      const { instructor_name, title } = results[0]; // Extract the instructor name and title from the query results
      
      // Insert enrollment with instructor name and title
      const insertEnrollmentQuery = 'INSERT INTO enrollments (user_id, course_id, instructor_name, title) VALUES (?, ?, ?, ?)';
      db.query(insertEnrollmentQuery, [userId, course_id, instructor_name, title], (err, result) => {
        if (err) {
          console.error('Error creating enrollment:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Enrollment created successfully', enrollmentId: result.insertId });
      });
    });
  } catch (error) {
    console.error('Error creating enrollment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.delete('/enrollments/:enrollmentId', verifyToken, async (req, res) => {
  const { enrollmentId } = req.params;

  try {
    // Check if the enrollment exists
    const checkEnrollmentQuery = 'SELECT * FROM enrollments WHERE enrollment_id = ?';
    db.query(checkEnrollmentQuery, [enrollmentId], (err, results) => {
      if (err) {
        console.error('Error checking enrollment:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }

      // If the enrollment exists, delete it
      const deleteEnrollmentQuery = 'DELETE FROM enrollments WHERE enrollment_id = ?';
      db.query(deleteEnrollmentQuery, [enrollmentId], (err, result) => {
        if (err) {
          console.error('Error deleting enrollment:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'Enrollment deleted successfully' });
      });
    });
  } catch (error) {
    console.error('Error deleting enrollment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});







module.exports = router;
