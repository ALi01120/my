import React, { useState } from 'react';
import axios from 'axios';
import './ContactUsPage .css';
import Navbar from './Navbar';
import Footer from './Footer';
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/send-email', formData);
      setSuccessMessage(response.data.message);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setErrorMessage('Failed to send email. Please try again later.');
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
         <Navbar/>
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <Footer/>
    </div>
  );
};

export default ContactForm;
