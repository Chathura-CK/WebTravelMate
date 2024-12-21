const sendToken = (user, statusCode, res) => {
    // Fetch the token from the user object
    const token = user.getJwtToken();

    // Define cookie options
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000 // Correct calculation
        ),
        httpOnly: true, // To enhance security, cookie cannot be accessed via JavaScript
    };

    // Send response with token and user data
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user,
    });
};

module.exports = sendToken;
