const express = require('express');
const router = express.Router();
const db = require('../db');
const { verifyToken } = require('../AuthModels/auth');

// Get messages for the authenticated user (sent and received)
// Get messages sent by the authenticated user
router.get('/messages/sent', verifyToken, (req, res) => {
  const userId = req.userId; // Get the ID of the authenticated user

  const sql = 'SELECT * FROM messages WHERE sender_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching sent messages:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ messages: results });
  });
});

// Get messages received by the authenticated user
router.get('/messages/received', verifyToken, (req, res) => {
  const userId = req.userId; // Get the ID of the authenticated user

  const sql = 'SELECT * FROM messages ';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching received messages:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ messages: results });
  });
});


// Send a new message
router.post('/messages', verifyToken, (req, res) => {
  const { receiver_id, message } = req.body;
  const senderId = req.userId; // Get the ID of the authenticated user

  const sql = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
  db.query(sql, [senderId, receiver_id, message], (err, result) => {
    if (err) {
      console.error('Error sending message:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Message sent successfully', messageId: result.insertId });
  });
});

// Reply to a message (send a new message to the original sender)
router.post('/messages/reply', verifyToken, (req, res) => {
  const { original_sender_id, message } = req.body; // Assuming you receive the original sender ID
  const receiverId = req.userId; // Get the ID of the authenticated user

  const sql = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
  db.query(sql, [receiverId, original_sender_id, message], (err, result) => {
    if (err) {
      console.error('Error replying to message:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ message: 'Reply sent successfully', messageId: result.insertId });
  });
});

module.exports = router;
