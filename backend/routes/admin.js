const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/auth'); // Updated import

// Apply authorizeRoles('admin') instead of adminMiddleware
router.get('/admin', 
    authMiddleware.isAuthenticatedUser, 
    authMiddleware.authorizeRoles('admin'), 
    adminController.getDashboard
);
router.get('/dashboard', 
    authMiddleware.isAuthenticatedUser, 
    authMiddleware.authorizeRoles('admin'), 
    adminController.getDashboard
);

router.get('/users', 
    authMiddleware.isAuthenticatedUser, 
    authMiddleware.authorizeRoles('admin'), 
    adminController.getUsers
);

module.exports = router;