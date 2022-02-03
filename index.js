// Imports
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const standard = require('./routes/standard');
const blitz = require('./routes/blitz');
const rapid = require('./routes/rapid');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

// Load env vars
dotenv.config({path:'./config/config.env'});

// Connect to database
connectDB();

// Init app routes for API
const app = express();
// Needed to parse json body
app.use(express.json());
app.use('/api/v1/standard', standard);
app.use('/api/v1/blitz', blitz);
app.use('/api/v1/rapid', rapid);
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.send("Hello")
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.white.bold));

