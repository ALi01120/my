import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../NavbarStyle.css'; // import css file

const Nave = () => {
    const navigate = useNavigate(); // Hook for navigation

    const handleLogout = () => {
        // Clear token from local storage
        localStorage.removeItem('token');
        // Redirect to index page
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">Maritime</h1>
                <div className="navbar-links">
                    <ul className="navbar-ul">
                        <li><a href="/client" className="navbar-link">Home</a></li>
                        <li><a href="/client/create_job" className="navbar-link">Create Job</a></li>
                        <li><a href="/client/manage_Job/:job_id" className="navbar-link">Manage Job</a></li>
                        <li><a href="/client/view-Application" className="navbar-link">View Application</a></li>
                        <li><a href="/client/profile" className="navbar-link">Profile</a></li>
                    </ul>
                    <button className="navbar-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Nave;
