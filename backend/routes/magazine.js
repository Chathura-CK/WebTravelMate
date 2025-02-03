const express = require('express');
const router = express.Router();
const MagazinePost = require('../models/magazine');
const authMiddleware = require('../middlewares/auth'); // Updated import

// Submit a new post (authenticated users only)
router.post('/submit', 
    authMiddleware.isAuthenticatedUser, 
    async (req, res) => {
        const { title, image, description } = req.body;
        const newPost = new MagazinePost({
            title,
            image,
            description,
            submittedBy: req.user.id,
        });
        await newPost.save();
        res.status(201).send(newPost);
    }
);

// Get all pending posts (admin only)
router.get('/pending', 
    authMiddleware.isAuthenticatedUser, 
    authMiddleware.authorizeRoles('admin'), 
    async (req, res) => {
        const pendingPosts = await MagazinePost.find({ status: 'pending' });
        res.send(pendingPosts);
    }
);

// Approve a post (admin only)
router.put('approve/:id', 
    authMiddleware.isAuthenticatedUser, 
    authMiddleware.authorizeRoles('admin'), 
    async (req, res) => {
        const post = await MagazinePost.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');
        post.status = 'approved';
        post.approvedBy = req.user.id;
        await post.save();
        res.send(post);
    }
);

// Get all approved posts (public access)
router.get('approved', async (req, res) => {
    const approvedPosts = await MagazinePost.find({ status: 'approved' });
    res.send(approvedPosts);
});

module.exports = router;