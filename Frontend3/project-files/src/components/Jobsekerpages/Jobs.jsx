import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllJobs.css'; // Import CSS file
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import Nave from './Nave';
import NotificationList2 from './NotificationList';

const Jobs = () => {
  const navigate = useNavigate(); // Access navigate function
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    country: '',
    salaryMin: 0,
    salaryMax: 100000, // Assuming maximum salary is 100000
    timing: []
  });

  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const jobsPerPage = 6; // Number of jobs to display per page

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Get the authentication token from localStorage
        const token = localStorage.getItem('token');
        // Add the token to the request headers
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        // Make the GET request to fetch all jobs
        const res = await axios.get('http://localhost:5000/Alljobs', config);
        setJobs(res.data.jobs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handleApply = (jobId) => {
    // Navigate to ApplyJobPage when Apply button is clicked
    navigate('/JobSeeker/apply-job', { state: { jobId } }); // Pass jobId as a state to the ApplyJobPage
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFilters({
        ...filters,
        [name]: checked ? [...filters[name], value] : filters[name].filter(item => item !== value)
      });
    } else {
      setFilters({
        ...filters,
        [name]: value
      });
    }
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobs = jobs.filter(job => {
    if (filters.category && job.category !== filters.category) {
      return false;
    }
    if (filters.country && job.country !== filters.country) {
      return false;
    }
    if (filters.salaryMin && job.salary < filters.salaryMin) {
      return false;
    }
    if (filters.salaryMax && job.salary > filters.salaryMax) {
      return false;
    }
    if (filters.timing.length > 0 && !filters.timing.includes(job.job_timing)) {
      return false;
    }
     if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  
  // Logic for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };


  return (
    <div>
      <Nave />
      <div className='all_container'>
        <header className="header">
          <div className="header-content">
            <h1>Maritime Job Portal</h1>
            <p>Find a new job today!</p>
            <div className="search-box">
            <input type="text" placeholder="Search jobs by name..." value={searchQuery} onChange={handleSearch} />
              <button>Search</button>
            </div>
          </div>
        </header>
        <div className="all-jobs-container">
          <div className="filters1">
            <h3>Filters</h3>
            <div>
              <label>Category:</label>
              <select name="category" value={filters.category} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Category 1">Maritime Engineering</option>
                <option value="Category 2">Nautical Science</option>
                {/* Add more options for categories */}
              </select>
            </div>
            <div>
              <label>Country:</label>
              <select name="country" value={filters.country} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Country 1"> Pakistan</option>
                <option value="Country 2">Country 2</option>
                {/* Add more options for countries */}
              </select>
            </div>
            <div>
              <label>Salary Range:</label>
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={filters.salaryMin}
                name="salaryMin"
                onChange={handleFilterChange}
              />
              <input
                type="range"
                min="0"
                max="100000"
                step="1000"
                value={filters.salaryMax}
                name="salaryMax"
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label>Timing:</label>
              <div>
                <label>Full-time</label>
                <input type="checkbox" name="timing" value="Full-time" onChange={handleFilterChange} />
              </div>
              <div>
                <label>Part-time</label>
                <input type="checkbox" name="timing" value="Part-time" onChange={handleFilterChange} />
              </div>
              <div>
                <label>Internship</label>
                <input type="checkbox" name="timing" value="Internship" onChange={handleFilterChange} />
              </div>
            </div>
          </div>
          <div className="job-list">
          {loading ? (
            <p>Loading...</p>
          ) : currentJobs.length > 0 ? (
            currentJobs.map(job => (
              <div key={job.job_id} className="job-box">
                <p><strong>Title:</strong> {job.title}</p>
                <p><strong>Category:</strong> {job.category}</p>
                <p><strong>Country:</strong> {job.country}</p>
                <p><strong>Salary:</strong> {job.salary}</p>
                <p><strong>Job Timing:</strong> {job.job_timing}</p>
                <button onClick={() => handleViewDetails(job)}>View Details</button>
                <button onClick={() => handleApply(job.job_id)}>Apply</button>
              </div>
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>
             {/* Pagination */}
             <div className="pagination">
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => goToPage(i + 1)}>{i + 1}</button>
          ))}
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={indexOfLastJob >= filteredJobs.length}>Next</button>
        </div>

          {selectedJob && (
            <div className="modal-overlay" onClick={handleCloseModal}>
              <div className="job-details" onClick={(e) => e.stopPropagation()}>
                <h3>{selectedJob.title}</h3>
                <p><strong>Category:</strong> {selectedJob.category}</p>
                <p><strong>Country:</strong> {selectedJob.country}</p>
                <p><strong>City:</strong> {selectedJob.city}</p>
                <p><strong>Location:</strong> {selectedJob.location}</p>
                <p><strong>Expiry Date:</strong> {selectedJob.expiry_date}</p>
                <p><strong>Job Timing:</strong> {selectedJob.job_timing}</p>
                <p><strong>Salary:</strong> {selectedJob.salary}</p>
                <p><strong>Description:</strong> {selectedJob.description}</p>
                <button onClick={handleCloseModal}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <NotificationList2/>
    </div>
  );
};

export default Jobs;
