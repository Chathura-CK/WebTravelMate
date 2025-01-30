const ErrorHandler = require('../util/errorHandler');

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){

        let error = {...err}

        error.message = err.message;

        // wrong Mongoose object error message
        if(error.name === 'CastError'){
            const message = `Resource not found. Invalid: ${error.path}`;
            error = new ErrorHandler(message, 400);
        }

        // handling mongoose validation error
        if (error.name === 'validationError'){
            const message = Object.values(error.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }

        // handling mongoose duplication error
        if (error.code === 11000){
            const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
            error = new ErrorHandler(message, 400);
        }

        // handling wrong JWT error
        if (error.name === 'JsonwebTokenError'){
            const message = 'JSON web token is invalid. Try again!!!';
            error = new ErrorHandler(message, 400);
        }

        // handling expired JWT error
        if (error.name === 'TokenExpiredError'){
            const message = 'JSON web token is expired. Try again!!!';
            error = new ErrorHandler(message, 400);
        }

        res.status(err.statusCode).json({
            success:false,
           
            message: err.message || 'Internal server Error'
            
        })
    }


}