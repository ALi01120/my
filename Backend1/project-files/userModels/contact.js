// contact.js

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configure Nodemailer transporter with environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Endpoint to handle contact form submissions
router.post('/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Email message configuration
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Change this to your email address
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
