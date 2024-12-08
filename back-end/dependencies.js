const express = require('express'); // Import Express
const bodyParser = require('body-parser'); // Middleware to parse form data
const mongoose = require('mongoose'); // MongoDB driver
const path = require('path'); // To manage paths
const Fine = require('./models/fine'); // Import the Fine model
require('dotenv').config(); // Load environment variables from .env file

// Access environment variables
const host = process.env.HOST; // Access HOST from .env
const port = process.env.PORT; // Access PORT from .env

const server = express(); // Initialize Express as 'server'

const router = express.Router(); // Use the server's Router for route definitions




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

// Validation patterns
const VALIDATION_PATTERNS = {
    name: /^[A-Za-z]+( [A-Za-z]+)*$/, // Alphabets and single spaces
    number: /^\d+$/, // Numbers only
    date: /^\d{4}-\d{2}-\d{2}$/ // YYYY-MM-DD format
};

// Error messages
const VALIDATION_ERROR_MESSAGES = {
    invalidFirstName: 'Invalid first name. Only alphabets and single spaces are allowed.',
    invalidLastName: 'Invalid last name. Only alphabets and single spaces are allowed.',
    invalidViolation: 'Invalid violation. Only alphabets and single spaces are allowed.',
    invalidAmount: 'Invalid amount. Only numbers are allowed.',
    invalidDueDate: 'Invalid due date. The date must be in YYYY-MM-DD format.'
};


// Export required instances and configurations
module.exports = {
    server,
    Fine,
    mongoose,
    port,
    host,
    router,
    VALIDATION_PATTERNS,
    VALIDATION_ERROR_MESSAGES
};