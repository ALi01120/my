import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import register from "../images/register.png";
import "./Register.css";
import Navbar from '../Navbar';
import Footer from '../Footer';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('Student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
        gender,
        age,
        role,
      });

      if (response.data.message) {
        navigate('/login');
      } else {
        setError('Failed to register user');
      }
    } catch (error) {
      setError('Unexpected error occurred!');
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div>
      <Navbar/>
    <div className="register-container">
      <div className="Register-form">
        <div className='img-contanter'>
          <img src={register} alt='Rigest' className="register-image" /> 
        </div>
        <div className="form-content">
          <h2 id="head1">Signup</h2>
          {error && <p className="error-message1">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              className="input-field1"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              className="input-field1"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="age">Age:</label>
            <input
              className="input-field1"
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <label htmlFor="gender">Gender:</label>
            <select
              className="select-field1"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label htmlFor="role">Role:</label>
            <select
              className="select-field1"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Student">Student</option>
              <option value="Job Seeker">Job Seeker</option>
              <option value="Client">Client</option>
            </select>
            <label htmlFor="password">Password:</label>
            <input
              className="input-field1"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isLoading && <div>Loading...</div>}
            <button className="submit-button" type="submit">
              Signup
            </button>
          </form>
          <div className="link">
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </div>
  );
};

export default Register;
