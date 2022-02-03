const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // Default mongodb server runs on localhost:27017
        const conn = await mongoose.connect("mongodb://localhost:27017/chess");
        console.log(`MongoDB Connected: ${conn.connection.host} \nPort: ${conn.connection.port}`.yellow);
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;