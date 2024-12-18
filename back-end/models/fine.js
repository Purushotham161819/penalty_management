const mongoose = require("mongoose");

// Define the schema for the fine
const fineSchema = new mongoose.Schema({
  violator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Violator", // Reference the Violator model
    required: true, // Ensure every fine is linked to a violator
  },
  violation: {
    type: String,
    required: true, // Ensure the violation is required
  },
  amount: {
    type: Number,
    required: true, // Ensure the amount is required
  },
  dueDate: {
    type: Date,
    required: true, // Ensure the due date is required
  },
  fineCreatedDate: {
    type: Date,
    default: Date.now, // Automatically set the date to the current timestamp
    required: true, // Ensure the fine creation date is required
  },
});

// Create a model using the schema
const Fine = mongoose.model("Fine", fineSchema);

module.exports = Fine;
