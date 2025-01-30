const express = require('express');
const app = express();
const cors = require('cors');



// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    credentials: true, // Include cookies in requests
  }));

const cookieParser  = require('cookie-parser');
const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());


// import routes
const auth = require('./routes/auth');
const events = require('./routes/events');

app.use('/api/v1', auth);
app.use('/api/v1', events);


app.use(errorMiddleware);


module.exports = app
