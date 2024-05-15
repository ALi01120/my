import React from 'react';
import { Link } from 'react-router-dom';
import './indexHomePage.css';
import './Hero.css';
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">Maritime</h1>
                <div className="navbar-links">
                    <Link to="/" className="navbar-link">Home</Link>
                    <Link to="/about" className="navbar-link">About</Link>
                    <Link to="/contact" className="navbar-link">Contact Us</Link>
                    <Link to="/login" className="navbar-link login">Login</Link>
                    <Link to="/register" className="navbar-link signup">Signup</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
