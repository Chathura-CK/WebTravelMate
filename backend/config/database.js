const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI)
        .then((con) => {
            console.log(`MongoDB Database Connected with host: ${con.connection.host}`);
        })
        .catch((err) => {
            console.error(`MongoDB Connection Error: ${err.message}`);
            process.exit(1); // Exit the process if the connection fails
        });
};

module.exports = connectDatabase;
