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
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <h1 className="navbar-logo">Maritime</h1>
                    <div className="navbar-links">
                        <ul className="navbar-ul">
                            <li><a href="/jobseeker" className="navbar-link">Home</a></li>
                            <li><a href="/JobSeeker/view_application" className="navbar-link">Your Jobs Application</a></li>
                            <li><a href="/jobseeker/profile" className="navbar-link">Profile</a></li>
                        </ul>
                        <button className="navbar-button" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nave;
