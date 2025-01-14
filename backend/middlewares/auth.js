const User = require('../models/user');
const catchAsyncErrors = require('./catchAsyncErrors');
const ErrorHandler = require('../util/errorHandler');
const jwt = require('jsonwebtoken');


// Checks if user is authenticated OR not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        console.log('No token found in cookies');
        return next(new ErrorHandler('Login first to access this resource.', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        
        next();
    } catch (error) {
        console.error('JWT verification failed:', error);
        return next(new ErrorHandler('Invalid token. Please log in again.', 401));
    }
});


// Handling user roles
exports.authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`,403)
            )
        }

        next()
    
    }
}