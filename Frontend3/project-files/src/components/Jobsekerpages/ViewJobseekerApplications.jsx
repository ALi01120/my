import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nave from './Nave';
import './ViewJobseekerApplications.css';
const ViewJobseekerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        const res = await axios.get('http://localhost:5000/applications', config);
        setApplications(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (applicationId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      await axios.delete(`http://localhost:5000/applications/${applicationId}`, config);
      // Refresh applications list after deletion
      const res = await axios.get('http://localhost:5000/applications', config);
      setApplications(res.data);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  return (

    <div>
      <Nave/>
    <div className="applications-container">
      <h2>My Job Applications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : applications.length > 0 ? (
        <ul>
          {applications.map(application => (
            <li key={application.application_id}>
              <p><strong>Application ID:</strong> {application.application_id}</p>
              <p><strong>Position:</strong> {application.position}</p>
              
              <button onClick={() => handleDelete(application.application_id)}>Cancel</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found</p>
      )}
    </div>
    </div>
  );
};

export default ViewJobseekerApplications;
