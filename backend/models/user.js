const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength:[30, 'name canot be longer than 30 characters']

    },
    email:{
        type:String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate:[validator.isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter your password'],
        minlength:[6,'password must be at least 6 characters'],
        select: false
    },
    avatar: {
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    }, 
    isAdmin: { 
        type: Boolean, 
        default: false 
    }, 
    created_at:{
        type:Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,



});

//Encrypting password before saving
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
}

this.password = await bcrypt.hash(this.password,10);
});

// compare user password 
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

// Define the getJWTToken method
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};

// generate password reset token
userSchema.methods.getResetPasswordToken = function(){
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken

}



module.exports = mongoose.model('User', userSchema);