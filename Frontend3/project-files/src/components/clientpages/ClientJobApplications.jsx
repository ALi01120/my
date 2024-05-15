import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nave from './Nave';
import './ClientJobApplications.css';

const ClientJobApplications = () => {
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
        const res = await axios.get('http://localhost:5000/client/applications', config);
        setApplications(res.data.applications);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <Nave/>
      <div className="client-job-applications-container">
        <h2>My Job Applications</h2>
        {loading ? (
          <p>Loading...</p>
        ) : applications.length > 0 ? (
          <ul>
            {applications.map(application => (
              <li key={application.application_id}>
                <p><strong>Job Title:</strong> {application.job_title}</p>
                <p><strong>Applicant Name:</strong> {application.first_name} {application.last_name}</p>
                <p><strong>Email:</strong> {application.email}</p>
                <p><strong>CV Path:</strong> <a href={application.applicant_cv_path} target="_blank" rel="noopener noreferrer">View CV</a></p>
                <p><strong>Application Date:</strong> {application.application_date}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No job applications found</p>
        )}
      </div>
    </div>
  );
};

export default ClientJobApplications;
