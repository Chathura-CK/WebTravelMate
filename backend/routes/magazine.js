const express = require('express');
const router = express.Router();

const { 
    submitPost,
    getPendingPosts,
    putApprovePosts,
    getApprovedPosts

 } = require('../controllers/magazineController');
 
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// Submit a new post (authenticated users only)
router.route('/submit').post(isAuthenticatedUser, submitPost);

// Get all pending posts (admin only)
router.route('/pending').get(
    isAuthenticatedUser, 
    authorizeRoles('admin'),
    getPendingPosts
);

// Approve a post (admin only)
router.put('/approve/:id', 
    isAuthenticatedUser, 
    authorizeRoles('admin'),
    putApprovePosts
);

// Get all approved posts (public access)
router.get('/approved', 
    getApprovedPosts
);

module.exports = router;