const User = require('../models/user');

const ErrorHandler = require('../util/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../util/jwtToken');
const sendEmail = require('../util/sendEmail');
const crypto = require('crypto');


// Register a user 

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'profile%2Fsample_profile.jpeg?alt=media&token=ac81c170-0657-4f7a-b78d-20107d6f4d6b',
            url:'https://firebasestorage.googleapis.com/v0/b/travelmate-a3828.appspot.com/o/admin%2Fprofile%2Fsample_profile.jpeg?alt=media&token=ac81c170-0657-4f7a-b78d-20107d6f4d6b'
        }
    })
    
    sendToken(user,200,res)

})

// Login User

exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const { email,password } = req.body;

    // check email and password entered by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400))
    }

    // finding user in db
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }
      
    // check password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401))

    }
    sendToken(user,200,res)

})

//Forgot password
exports.forgotPassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findOne({ email:req.body.email });

    if (!user){
        return next(new ErrorHandler('user not fount with this email',404));
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    //Reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nif you have not
    requested this ,then ignore it.`;

    try{

        await sendEmail({
            email:user.email,
            subject: 'TravelMate Password Recovery',
            message
        })

        res.status(200).json({
            success:true,
            message: `Email sent to: ${ user.email }`
        })

    } catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message,500))
    }


})  

//Reset password
exports.resetPassword = catchAsyncErrors(async (req,res,next)=>{
    
    //Hash rURL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ 
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() } 
    });

    if (!user){
        return next(new ErrorHandler('password reset token is invalid or has benn expired', 400));
    }

    if (req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('password does not match', 400));

    }

    // Setup the password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res);


})  

// Get currently logged in user details /api/v1/me
exports.getUserProfile = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
   
    
    res.status(200).json({
        success:true,
        user
    })
    
});

//update / change password  /ap/v1/password/update
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select('+password');

    //check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if(!isMatched){
        return next(new ErrorHandler('previous password is incorrect',400));
        
    }

    user.password = req.body.oldPassword;
    await user.save();

    sendToken(user,200,res);
   
    
    res.status(200).json({
        success:true,
        user
    })
    
})

//update profile  /ap/v1/me/update
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    } 

    //update profile picture
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        name: true,
        runValidators: true,
        useFindAndModify: false
    })

   
    res.status(200).json({
        success:true,
    })
    
})

// logout 
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    
    res.status(200).json({
        success:true,
        message: 'Logged out'
    })
    
})

// Admin Routes

// Get all users    /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req,res,next) => {
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

// Get user details    /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req,res,next) => {

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`));
    }

    res.status(200).json({
        success:true,
        user
    })
})

// update user profile       /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    } 

    //update profile picture
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        name: true,
        runValidators: true,
        useFindAndModify: false
    })

   
    res.status(200).json({
        success:true,
    })
    
})

// Delete user    /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`,400))
    }
    
    // Remove profile picture from cloudinary

    await user.deleteOne();

    res.status(200).json({
        success:true,
       
    })
})



