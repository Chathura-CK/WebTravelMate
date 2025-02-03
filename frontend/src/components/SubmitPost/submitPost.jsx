import React, { useState } from 'react';
import axios from 'axios';
import './submitPost.css'; // Import the CSS file

const SubmitPostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { title, image, description };
    await axios.post('http://localhost:4000/api/v1/magazine/submit', newPost);
    onSubmit();
  };

  return (
    <div className="submit-post-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubmitPostForm;