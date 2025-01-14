const express = require('express');
const app = express();
const cors = require('cors');



// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    }));

const cookieParser  = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());


// import routes
const packages = require('./routes/packages');
const auth = require('./routes/auth');
const booking = require('./routes/bookings');




app.use('/api/v1', packages);
app.use('/api/v1', auth);
app.use('/api/v1', booking);

app.use(errorMiddleware);


module.exports = app
