const Event = require('../models/events');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const events = require('../data/events');


dotenv.config({path:'backend/config/config.env'})

connectDatabase();

const seedEvents = async() =>{
    try{

        await Event.deleteMany();
        console.log('Events are deleted');
        
        await Event.insertMany(events);
        console.log('Events are inserted');

        process.exit();

    } catch(error){
        console.log(error.message);
        process.exit();
        

}}

seedEvents();