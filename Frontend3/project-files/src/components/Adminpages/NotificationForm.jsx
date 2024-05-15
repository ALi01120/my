import React, { useState } from 'react';
import axios from 'axios';
import './NotificationForm.css'; // Import CSS file
import Nave from './Nave';
const NotificationForm = () => {
  const [user_id, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      const response = await axios.post('http://localhost:5000/notifications', { user_id, title, message }, { headers: { Authorization: `Bearer ${token}` } });
      setSuccessMessage(response.data.message);
      setUserId('');
      setTitle('');
      setMessage('');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <Nave/>
    <div className="notification-form-container">
      <h2>Post Notification</h2>
      <form onSubmit={handleSubmit} className="notification-form">
        <div className="form-group">
          <label htmlFor="user_id" className="form-label">User ID:</label>
          <input
            type="text"
            id="user_id"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Post Notification</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
    </div>
  );
};

export default NotificationForm;
