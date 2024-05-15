const express = require('express');
const router = express.Router();
const { verifyToken } = require('../AuthModels/auth');
const db = require('../db');

// View Notifications route
router.get('/notifications', verifyToken, (req, res) => {
  const user_id = req.userId;

  // Query to fetch notifications for the current user
  const selectQuery = 'SELECT notification_id, user_id, title, message, notification_date, is_read FROM notifications WHERE user_id = ?';
  db.query(selectQuery, [user_id], (err, notifications) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    res.json(notifications);
  });
});

// Post Notification route
router.post('/notifications', verifyToken, (req, res) => {
  const { user_id, title, message } = req.body;

  // Insert the new notification into the database
  const insertQuery = 'INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)';
  db.query(insertQuery, [user_id, title, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    res.status(201).json({ message: 'Notification posted successfully' });
  });
});

module.exports = router;
