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
                        <li><a href="/Admin" className="navbar-link">Home</a></li>
                        <li><a href="/Admin/Adminpage1" className="navbar-link">Profile Management</a></li>
                        <li><a href="/Admin/Adminpage2" className="navbar-link">Course Management</a></li>
                        <li><a href="/Admin/Adminpage3" className="navbar-link">Create Course</a></li>
                        <li><a href="/Admin/Adminpage4" className="navbar-link">Student Messages</a></li>
                        <li><a href="/Admin/Adminpage5" className="navbar-link">Notification</a></li>
                    </ul>
                    
                    <button className="navbar-button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Nave;
