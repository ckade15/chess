// Imports
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
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
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Sec-Fetch-Mode");
    next();
  });
app.use(express.json());
app.use('/api/v1/standard', standard);
app.use('/api/v1/blitz', blitz);
app.use('/api/v1/rapid', rapid);
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    res.send("FIDE API");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.white.bold));

