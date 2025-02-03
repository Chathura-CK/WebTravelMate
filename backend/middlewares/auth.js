const User = require('../models/user');
const catchAsyncErrors = require('./catchAsyncErrors');
const ErrorHandler = require('../util/errorHandler');
const jwt = require('jsonwebtoken');

// Unified authentication middleware
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Authentication required. Please log in first.', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        
        if (!req.user) {
            return next(new ErrorHandler('User not found.', 404));
        }
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new ErrorHandler('Session expired. Please log in again.', 401));
        }
        return next(new ErrorHandler('Invalid authentication token.', 401));
    }
});

// Enhanced role-based authorization
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Access denied. Required role: ${roles.join(', ')}. Your role: ${req.user.role}.`,
                    403
                )
            );
        }
        
        // Additional admin-specific checks if needed
        if (req.user.role === 'admin' && !req.user.isAdmin) {
            return next(new ErrorHandler('Admin privileges required.', 403));
        }

        next();
    };
};

// Admin-specific middleware (optional, can be replaced by authorizeRoles('admin'))
exports.isAdmin = catchAsyncErrors(async (req, res, next) => {
    if (!req.user.isAdmin || req.user.role !== 'admin') {
        return next(
            new ErrorHandler('Administrator privileges required for this action.', 403)
        );
    }
    next();
});