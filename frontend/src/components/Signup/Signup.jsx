import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('/api/v1/register', formData);
      setSuccess('Registration successful!');
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}
          <div className="input-group">
            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn">Register</button>
          <p className="redirect-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
