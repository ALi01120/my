import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import login from '../images/login.png';
import "./Login.css";
import Navbar from '../Navbar';
import Footer from '../Footer';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { role, token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      if (role === 'Student') {
        navigate('/student');
      } else if (role === 'Job Seeker') {
        navigate('/jobseeker');
      } else if (role === 'Client') {
        navigate('/client');
      } else if (role === 'Administrator') {
        navigate('/Admin');
      } else {
        setError('Invalid role received');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="login-container">
      <div className="login-form">
        <div className='image-container'>
          <img src={login} alt='img' className="login-image" />
        </div>
        <div className="form-content">
          <h2 id='head2'>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit} >
            <label htmlFor="username">Username:</label>
            <input
              className="input-field"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              className="input-field"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="submit-button" type="submit">Login</button>
            <p className="signup-link">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
     <Footer/>
    </div>
  );
};

export default LoginForm;
