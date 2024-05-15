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
                        <li><a href="/Student" className="navbar-link">Home</a></li>
                        <li><a href="/Student/View_Couses" className="navbar-link">All Courses</a></li>
                        <li><a href="/Student/enroled_corse" className="navbar-link">View Enrolled Courses</a></li>
                        <li><a href="/Student/profile" className="navbar-link">Profile</a></li>
                    </ul>
                    <button className="navbar-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Nave;
