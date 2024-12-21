const Package = require('../models/package');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const packages = require('../data/tpackages');


dotenv.config({path:'backend/config/config.env'})

connectDatabase();

const seedPackages = async() =>{
    try{

        await Package.deleteMany();
        console.log('Packages are deleted');
        
        await Package.insertMany(packages);
        console.log('Packages are inserted');

        process.exit();

    } catch(error){
        console.log(error.message);
        process.exit();
        

}}

seedPackages();