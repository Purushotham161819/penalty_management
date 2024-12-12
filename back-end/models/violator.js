const mongoose = require('mongoose');

// Define the schema for the violator
const violatorSchema = new mongoose.Schema({
    violatorID: {
        type: String,
        required: true, // Ensure the violator ID is required
        unique: true    // Ensure it is unique
    },
    firstName: {
        type: String,
        required: true // Ensure the name is required
    },
    lastName: {
        type: String,
        required: true // Ensure the name is required
    },
    DoB: {
        type: Date,
        required: true // Ensure the date of birth is required
    },
    email: {
        type: String,
        required: true, // Ensure the email is required
    },
    contactNumber: {
        type: String,
        required: true // Ensure the contact number is required
    },
    address: {
        street: {
            type: String,
            required: true // Ensure the street address is required
        },
        apartment: {
            type: String,
            required: false // Apartment number can be optional
        },
        city: {
            type: String,
            required: true // Ensure the city or town is required
        },
        state: {
            type: String,
            required: true // Ensure the state is required
        },
        zipCode: {
            type: String,
            required: true // Ensure the ZIP code is required
        }
    }
});


// Create a model using the schema
const Violator = mongoose.model('Violator', violatorSchema);

module.exports = Violator; // Export the model for use in other files
