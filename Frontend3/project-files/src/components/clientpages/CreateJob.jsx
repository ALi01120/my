import React, { useState } from 'react';
import axios from 'axios';
import './CreateJob.css'; // Import CSS file
import Nave from './Nave';

const CreateJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    country: '',
    city: '',
    location: '',
    expiry_date: '',
    job_timing: '',
    salary: ''
  });

  const { title, description, category, country, city, location, expiry_date, job_timing, salary } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();

    // Check if any required fields are missing
    const requiredFields = ['title', 'description', 'category', 'country', 'city', 'location', 'expiry_date', 'job_timing', 'salary'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill out the following fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      // Get the authentication token from localStorage
      const token = localStorage.getItem('token');
      // Add the token to the request headers
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      // Make the POST request to create a new job
      const res = await axios.post('http://localhost:5000/jobs', formData, config);
      console.log(res.data);
      // Optionally, you can redirect the user to another page after successful job creation

      // Show alert box for successful job creation
      alert('Job created successfully!');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <Nave />
      <div className="create-job-container">
        <h2>Create a New Job Listing</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={description}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={category}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={country}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={location}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label>Expiry Date:</label>
            <input
              type="date"
              name="expiry_date"
              value={expiry_date}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label>Job Timing:</label>
            <select
              name="job_timing"
              value={job_timing}
              onChange={onChange}
              required
            >
              <option value="">Select</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div>
            <label>Salary:</label>
            <input
              type="text"
              name="salary"
              value={salary}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label>Salary Range:</label>
            <input
              type="range"
              name="salary_range"
              min="0"
              max="100000"
              step="1000"
              value={salary}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
