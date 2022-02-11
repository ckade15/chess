const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        // Default mongodb server runs on localhost:27017
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host} \nPort: ${conn.connection.port}`.yellow);
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDB;