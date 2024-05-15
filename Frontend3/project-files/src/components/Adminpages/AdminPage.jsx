import React, { useState, useEffect } from 'react';
import './AdminPage.css';
import Nave from './Nave';
function AdminPage1() {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'Administrator', // Default role
    age: '',
    gender: 'Male', // Default gender
  });
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [error, setError] = useState('');
  const [showCreateUser, setShowCreateUser] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      [fieldName]: fieldValue
    }));
  };

  const handleUpdate = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/data/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setRefresh(!refresh);
      setSelectedUserId(null);
      window.alert('User updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/data/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setRefresh(!refresh);
      window.alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    setSelectedUserId(id);
    const selectedUser = data.find(user => user.id === id);
    setFormData(selectedUser);
  };

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setRefresh(!refresh);
      setShowCreateUser(false);
      window.alert('User created successfully');
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Error creating user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nave/>
    <div className="admin-page">
      <h1>User Management</h1>
      <div className="action-buttons">
        <button onClick={() => setShowCreateUser(!showCreateUser)}>
          {showCreateUser ? 'Hide Create User' : 'Create User'}
        </button>
      </div>
      {showCreateUser && (
        <div className="form-container">
          <label htmlFor="username">Username:</label>
          <input className="input-field" type="text" name="username" value={formData.username} onChange={handleInputChange} /><br />
          <label htmlFor="email">Email:</label>
          <input className="input-field" type="email" name="email" value={formData.email} onChange={handleInputChange} /><br />
          <label htmlFor="age">Age:</label>
          <input className="input-field" type="number" name="age" value={formData.age} onChange={handleInputChange} /><br />
          <label htmlFor="gender">Gender:</label>
          <select className="input-field" name="gender" value={formData.gender} onChange={handleInputChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select><br />
          <label htmlFor="password">Password:</label>
          <input className="input-field" type="password" name="password" value={formData.password} onChange={handleInputChange} /><br />
          <label htmlFor="role">Role:</label>
          <select className="input-field" name="role" value={formData.role} onChange={handleInputChange}>
            <option value="Administrator">Administrator</option>
            <option value="Student">Student</option>
            <option value="Job Seeker">Job Seeker</option>
            <option value="Client">Client</option>
          </select><br />
          <button className="submit-button" onClick={handleCreateUser}>Create New User</button>
        </div>
      )}

      {loading && <div className="loading-indicator">Loading...</div>}
      {error && <p className="error-message">{error}</p>}

      <div className="form-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  {selectedUserId === item.id ? <input type="text" name="username" value={formData.username} onChange={handleInputChange} /> : item.username}
                </td>
                <td>
                  {selectedUserId === item.id ? <input type="text" name="email" value={formData.email} onChange={handleInputChange} /> : item.email}
                </td>
                <td>
                  {selectedUserId === item.id ? <input className="input-field" type="number" name="age" value={formData.age} onChange={handleInputChange} /> : item.age}
                </td>
                <td>
                  {selectedUserId === item.id ? (
                    <select className="input-field" name="gender" value={formData.gender} onChange={handleInputChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : item.gender}
                </td>
                <td>
                  {selectedUserId === item.id ? <input type="password" name="password" value={formData.password} onChange={handleInputChange} /> : '********'}
                </td>
                <td>
                  {selectedUserId === item.id ? (
                    <select className="input-field" name="role" value={formData.role} onChange={handleInputChange}>
                      <option value="Administrator">Administrator</option>
                      <option value="Student">Student</option>
                      <option value="Job Seeker">Job Seeker</option>
                      <option value="Client">Client</option>
                    </select>
                  ) : item.role}
                </td>
                <td>
                  {selectedUserId === item.id ? (
                    <>
                      <button onClick={() => handleUpdate(item.id)}>Save</button>
                      <button onClick={() => setSelectedUserId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item.id)}>Edit</button>
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default AdminPage1;
