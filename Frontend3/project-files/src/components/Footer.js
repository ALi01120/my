// Footer Component
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer-content">
                <div className="footer-left">
                    <h3>Maritime Education</h3>
                    <p>Maritime education plays a vital role in shaping the future of the maritime industry. At Maritime Education System, we are committed to providing high-quality education and training to aspiring maritime professionals.</p>
                    <p>Explore our courses and start your journey towards a rewarding career at sea.</p>
                    <p>&copy; 2024 Maritime Education System. All rights reserved.</p>
                </div>
                <div className="footer-right">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
