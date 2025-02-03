import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const token = 'YOUR_AUTH_TOKEN'; // Replace with your actual token or retrieve it dynamically

  useEffect(() => {
    const fetchPendingPosts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:4000/api/v1/magazine/pending', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPendingPosts(response.data);
      } catch (error) {
        console.error('Error fetching pending posts:', error);
      }
    };

    fetchPendingPosts();
  }, [token]);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:4000/api/v1/magazine/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Remove the approved post from the state
      setPendingPosts(pendingPosts.filter(post => post._id !== id));
    } catch (error) {
      console.error('Error approving post:', error);
    }
  };

  return (
    <div>
      <h2>Pending Posts</h2>
      {pendingPosts.map(post => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <img src={post.image} alt={post.title} />
          <p>{post.description}</p>
          <button onClick={() => handleApprove(post._id)}>Approve</button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
