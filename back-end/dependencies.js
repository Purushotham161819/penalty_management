const express = require('express'); // Import Express
const bodyParser = require('body-parser'); // Middleware to parse form data
const mongoose = require('mongoose'); // MongoDB driver
const path = require('path'); // To manage paths
const Fine = require('./models/fine'); // Import the Name model from models/name.js
require('dotenv').config(); // Load environment variables from .env file

const port = process.env.PORT; // Access PORT from .env

const server = express(); // Initialize Express as 'server'

const router = express.Router();  // Use the server's Router for route definitions


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/fineDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
server.use(bodyParser.urlencoded({ extended: true })); // To parse form data
server.set('view engine', 'ejs'); // Set EJS as the template engine
server.set('views', path.join(__dirname, 'views')); // Views folder
server.use(express.json()); // For JSON payloads
server.use(express.urlencoded({ extended: true })); // For form-encoded payloads


// Export required instances and configurations
module.exports = {server, Fine, mongoose, port, express, router};