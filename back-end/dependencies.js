const express = require("express"); // Import Express
const bodyParser = require("body-parser"); // Middleware to parse form data
const mongoose = require("mongoose"); // MongoDB driver
const path = require("path"); // To manage paths
const Fine = require("./models/fine"); // Import the Fine model
require("dotenv").config(); // Load environment variables from .env file

const fs = require("fs");
const xlsx = require("xlsx");
const multer = require("multer");

// Configure multer middleware for file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory for quick access
  fileFilter: (req, file, cb) => {
    const fileType = file.mimetype;
    if (
      fileType !== "application/json" &&
      fileType !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return cb(new Error("Only JSON or Excel files are allowed!"), false);
    }
    cb(null, true);
  },
});

// Access environment variables
const host = process.env.HOST; // Access HOST from .env
const port = process.env.PORT; // Access PORT from .env

const server = express(); // Initialize Express as 'server'

const router = express.Router(); // Use the server's Router for route definitions

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/fineDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Middleware
server.use(bodyParser.urlencoded({ extended: true })); // To parse form data
server.set("view engine", "ejs"); // Set EJS as the template engine
server.set("views", path.join(__dirname, "views")); // Views folder
server.use(express.json()); // For JSON payloads
server.use(express.urlencoded({ extended: true })); // For form-encoded payloads

// Validation patterns
const VALIDATION_PATTERNS = {
  name: /^[A-Za-z]+( [A-Za-z]+)*$/, // Alphabets and single spaces
  number: /^\d+$/, // Numbers only
  date: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD format
  id: /^[A-Za-z0-9]+$/, // Example: alphanumeric ID
  name: /^[A-Za-z ]+$/, // Example: only letters and spaces for names
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
  phoneNumber: /^\d{10}$/, // Example: 10-digit phone number
  address: /^.{5,}$/, // Minimum 5 characters for the address
};

// Error messages
const VALIDATION_ERROR_MESSAGES = {
  invalidViolatorID:
    "The provided violator ID is invalid. Please provide a valid ID.",
  invalidFirstName:
    "Invalid first name. Only alphabets and single spaces are allowed.",
  invalidLastName:
    "Invalid last name. Only alphabets and single spaces are allowed.",
  invalidViolation:
    "Invalid violation. Only alphabets and single spaces are allowed.",
  invalidAmount: "Invalid amount. Only numbers are allowed.",
  invalidDueDate: "Invalid due date. The date must be in YYYY-MM-DD format.",
  invalidViolatorID: "Invalid Violator ID.",
  violatorNotFound:
    "The violator ID does not exist in the database. Please ensure you have added the violator before assigning a fine.",
  invalidName: "Name should only contain letters and spaces.",
  invalidDoB: "Invalid Date of Birth. Format should be YYYY-MM-DD.",
  invalidEmail: "Invalid email format.",
  invalidContactNumber:
    "Invalid contact number. It should be a 10-digit number.",
  invalidAddress:
    "Invalid address. Address should be at least 5 characters long.",
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
  VALIDATION_ERROR_MESSAGES,
  fs,
  xlsx,
  upload,
};
