const mongoose = require('mongoose');

// Define the schema for the penalty
const penaltySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true // Ensure the first name is required
    },
    lastName: {
        type: String,
        required:true // Ensure the last name is required
    },
    violation: {
        type: String,
        required: true // Ensure the violation is required
    },
    amount:{
        type: Number,
        required:true // Ensure the amount is required
    },
    dueDate: {
        type: Date,
        required: true //Ensure the date is required
    }
});

// Create a model using the schema
const Fine = mongoose.model('Fine', penaltySchema);

module.exports = Fine; // Export the model for use in other files
