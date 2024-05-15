import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageJob.css'; // Import CSS file
import Nave from './Nave';

const ManageJob = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editJobId, setEditJobId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedCountry, setUpdatedCountry] = useState('');
  const [updatedCity, setUpdatedCity] = useState('');
  const [updatedLocation, setUpdatedLocation] = useState('');
  
  const [updatedJobTiming, setUpdatedJobTiming] = useState('');
  const [updatedSalary, setUpdatedSalary] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track whether user is editing

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/jobs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setJobs(jobs.filter(job => job.job_id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleEdit = (jobId) => {
    const jobToEdit = jobs.find(job => job.job_id === jobId);
    setUpdatedTitle(jobToEdit.title || '');
    setUpdatedDescription(jobToEdit.description || '');
    setUpdatedCategory(jobToEdit.category || '');
    setUpdatedCountry(jobToEdit.country || '');
    setUpdatedCity(jobToEdit.city || '');
    setUpdatedLocation(jobToEdit.location || '');
    
    setUpdatedJobTiming(jobToEdit.job_timing || '');
    setUpdatedSalary(jobToEdit.salary || '');
    setEditJobId(jobId);
    setIsEditing(true); // Move this line here
  };

  const handleUpdate = async () => {
    // Check if any required field is empty
    if (!updatedTitle || !updatedDescription || !updatedCategory || !updatedCountry || !updatedCity || !updatedLocation || !updatedJobTiming || !updatedSalary) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/jobs/${editJobId}`, {
        title: updatedTitle,
        description: updatedDescription,
        category: updatedCategory,
        country: updatedCountry,
        city: updatedCity,
        location: updatedLocation,
        job_timing: updatedJobTiming,
        salary: updatedSalary
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditJobId(null);
      setIsEditing(false); // Set editing mode to false after update
      // Refresh job list
      const response = await axios.get('http://localhost:5000/jobs', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleCancelUpdate = () => {
    setIsEditing(false); // Set editing mode to false
    setUpdatedTitle(''); // Reset updated fields
    setUpdatedDescription('');
    setUpdatedCategory('');
    setUpdatedCountry('');
    setUpdatedCity('');
    setUpdatedLocation('');
   
    setUpdatedJobTiming('');
    setUpdatedSalary('');
  };

  return (
    <div>
      <Nave/>
      <div className="manage-job-container">
        <h1 className='hed02'>Manage Jobs</h1>
        {loading ? (
          <p>Loading...</p>
        ) : jobs.length > 0 ? (
          <div>
            {jobs.map(job => (
              <div key={job.job_id} className="job-box">
              {editJobId === job.job_id && isEditing ? ( // Check if editing mode is true
                <div>
                  <input
                    type="text"
                    className='input_field'
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)
                      
                    }
                  />
                  <textarea
                    value={updatedDescription}
                    className='input_field'
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                  {/* Add input fields for other new fields here */}
                  <input
                    type="text"
                    className='input_field'
                    value={updatedCategory}
                    onChange={(e) => setUpdatedCategory(e.target.value)}
                  />
                  <input
                    type="text"
                    className='input_field'
                    value={updatedCountry}
                    onChange={(e) => setUpdatedCountry(e.target.value)}
                  />
                  <input
                    type="text"
                    className='input_field'
                    value={updatedCity}
                    onChange={(e) => setUpdatedCity(e.target.value)}
                  />
                  <input
                    type="text"
                    className='input_field'
                    value={updatedLocation}
                    onChange={(e) => setUpdatedLocation(e.target.value)}
                  />
                  
                  <select
                    value={updatedJobTiming}
                    
                    onChange={(e) => setUpdatedJobTiming(e.target.value)}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                  </select>
                  <input
                    type="text"
                    value={updatedSalary}
                    onChange={(e) => setUpdatedSalary(e.target.value)}
                  />
                  <button className="btn-update" onClick={handleUpdate}>Update</button>
                  <button className="btn-cancel-update" onClick={handleCancelUpdate}>Cancel Update</button> {/* Add Cancel Update button */}
                </div>
              ) : (
                <div>
                  <h3>{job.title}</h3>
                  
                  {/* Display other new fields here */}
                  <p>Category: {job.category}</p>
                  <p>Country: {job.country}</p>
                  <p>City: {job.city}</p>
                  <p>Location: {job.location}</p>
                  <p>Expiry Date: {job.expiry_date}</p>
                  <p>Job Timing: {job.job_timing}</p>
                  <p>Salary: {job.salary}</p>
                  <textarea value={job.description} readOnly className='description-textarea'/>
                  <button className="btn-edit" onClick={() => handleEdit(job.job_id)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(job.job_id)}>Delete</button>
                </div>
              )}
            </div>
            ))}
          </div>
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default ManageJob;
