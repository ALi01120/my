import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ApplyJobPage.css';

const ApplyJobPage = () => {
  const location = useLocation();
  const jobId = location.state ? location.state.jobId : ''; // Retrieve jobId from location state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    cv: null, // Add cv state to handle file upload
    job_id: jobId // Add jobId to the formData state
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value // Handle file upload separately
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the authentication token from localStorage
      const token = localStorage.getItem('token');
      // Create FormData object to send form data including file
      const formDataToSend = new FormData();
      formDataToSend.append('first_name', formData.first_name);
      formDataToSend.append('last_name', formData.last_name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('cv', formData.cv);
      formDataToSend.append('job_id', formData.job_id);
      // Add the token to the request headers
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Set content type for file upload
        }
      };
      // Send a POST request to the server to submit the job application
      const res = await axios.post('http://localhost:5000/apply', formDataToSend, config);
      console.log(res.data.message); // Log the response message
      // Optionally, you can redirect the user to a confirmation page or display a success message
    } catch (error) {
      console.error('Error applying for job:', error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };

  return (
    <div className="apply-job-container">
      <h2>Apply for Job</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for the job application form */}
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Position:</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        />
        <label>CV:</label>
        <input
          type="file"
          name="cv"
          onChange={handleChange}
          accept=".pdf,.doc,.docx" // Accept only specific file types
          required
        />
        <label>Job ID:</label> {/* Add input field for job_id */}
        <input
          type="text"
          name="job_id"
          value={formData.job_id}
          onChange={handleChange}
          required
          disabled // Disable input field to prevent user modification
        />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyJobPage;
