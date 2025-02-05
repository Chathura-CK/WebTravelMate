import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './adminPanel.css';

const AdminPanel = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const navigate = useNavigate();
  // const token = localStorage.getItem('token'); 
  // const storedUser = JSON.parse(localStorage.getItem('user')); 
  const { error, isAuthenticated, user} = useSelector((state) => state.auth);
  

  useEffect(() => {
    if (!isAuthenticated || !user) {
      alert('You are not authenticated!');
      navigate('/login'); // Redirect to login
      return;
    }

    if (user.role !== 'admin') {
      alert('Access Denied: Admins only');
      navigate('/'); // Redirect to home
      return;
    }

        const fetchPendingPosts = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          throw new Error('No token found');
        }

        console.log('Token:', token); // Log the token for debugging

        const response = await axios.get('http://localhost:4000/api/v1/magazine/pending', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
          withCredentials: true,
        });

        console.log('Response:', response); // Log the response for debugging

        setPendingPosts(response.data.pendingPosts);
      } catch (error) {
        console.error('Error fetching pending posts:', error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
          alert('Failed to fetch pending posts. Please try again.');
        }
      }
    };
    fetchPendingPosts();
  }, [error, isAuthenticated, user, navigate]);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        throw new Error('No token found');
      }

      await axios.put(`http://localhost:4000/api/v1/magazine/approve/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
        withCredentials: true,
      }
      
    );

      setPendingPosts(pendingPosts.filter(post => post._id !== id));
      alert('Post approved successfully.');
    } catch (error) {
      console.error('Error approving post:', error);
      alert('Approval failed.');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Pending Posts</h2>
      <div className="pending-posts-grid">
        {pendingPosts.map(post => (
          <div key={post._id} className="post-card">
            <img src={post.image} alt={post.title} />
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <button className="approve-button" onClick={() => handleApprove(post._id)}>
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
