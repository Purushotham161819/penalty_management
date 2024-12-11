// Import necessary dependencies from dependencies.js
const { server, Fine, router, mongoose, VALIDATION_PATTERNS, VALIDATION_ERROR_MESSAGES } = require('../dependencies'); 
// Import the Violator model
const Violator = require('../models/violator'); 


// Route to add data to fine to server
server.post(process.env.ADD_FINE_ROUTE, async (req, res) => {
    const { firstName, lastName, violation, amount, dueDate } = req.body;

    // Validate input fields
    if (!firstName || !VALIDATION_PATTERNS.name.test(firstName)) {
        return res.status(400).json({ message: VALIDATION_ERROR_MESSAGES.invalidFirstName });
    }
    if (!lastName || !VALIDATION_PATTERNS.name.test(lastName)) {
        return res.status(400).json({ message: VALIDATION_ERROR_MESSAGES.invalidLastName });
    }
    if (!violation || !VALIDATION_PATTERNS.name.test(violation)) {
        return res.status(400).json({ message: VALIDATION_ERROR_MESSAGES.invalidViolation });
    }
    if (!amount || !VALIDATION_PATTERNS.number.test(amount)) {
        return res.status(400).json({ message: VALIDATION_ERROR_MESSAGES.invalidAmount });
    }
    if (!dueDate || !VALIDATION_PATTERNS.date.test(dueDate)) {
        return res.status(400).json({ message: VALIDATION_ERROR_MESSAGES.invalidDueDate });
    }

    // Proceed with saving to the database
    try {
        const newFine = new Fine({ firstName, lastName, violation, amount, dueDate }); // Create a new document
        await newFine.save(); // Save to the database
        res.status(201).json({ message: process.env.FINE_ADD_SUCCESS }); // Success response
    } catch (error) {
        console.error('Error saving fine:', error); // Log the error
        res.status(500).json({ message: process.env.FINE_ADD_ERROR }); // Failure response
    }
});


// Route: Delete Record
server.delete(process.env.DELETE_FINE_ROUTE, async (req, res) => {
    const recordID = req.params.id; // Extract record ID from the route parameter
    try {
        const result = await Fine.findByIdAndDelete(recordID); // Attempt to delete the record
        if (result) {
            res.json({ success: true, message: process.env.DELETE_SUCCESS }); // Success response
        } else {
            res.json({ success: false, message: process.env.DELETE_NOT_FOUND }); // Record not found
        }
    } catch (error) {
        console.error("Error deleting record:", error); // Log the error
        res.json({ success: false, message: process.env.DELETE_ERROR }); // Error response
    }
});

// Get Record By ID
server.get(process.env.GET_RECORD_ROUTE, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Fine.findById(id);
        if (!user) {
            res.status(404).json({ 
                success: false, 
                message: process.env.RECORD_NOT_FOUND // Using environment variable
            });
            return; // Exit the function after sending the response
        }
        res.json({ success: true, data: user });
    } catch (error) {
        console.error('Error fetching record:', error);
        res.status(500).json({ 
            success: false, 
            message: process.env.FETCH_RECORD_ERROR // Using environment variable
        });
    }
});


// Update Record By ID
server.put(process.env.UPDATE_RECORD_ROUTE, async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedRecord = await Fine.findByIdAndUpdate(
            id,
            updatedData,
            { new: true, runValidators: true } // Return the updated document and validate the data
        );

        if (!updatedRecord) {
            return res.status(404).json({
                success: false,
                message: process.env.RECORD_NOT_FOUND 
            });
        }

        res.json({
            success: true,
            message: process.env.RECORD_UPDATE_SUCCESS, 
            data: updatedRecord
        });
    } catch (error) {
        console.error('Error updating record:', error); // Log error for debugging
        res.status(500).json({
            success: false,
            message: process.env.RECORD_UPDATE_ERROR, // Using environment variable
            error: error.message // Include error details for client debugging (optional)
        });
    }
});


// API to add violator details
server.post(process.env.ADD_VIOLATOR_ROUTE, async (req, res) => {
    const { violatorID, name, DoB, email, contactNumber, address } = req.body;

    // Validate input fields
    if (!violatorID || !VALIDATION_PATTERNS.id.test(violatorID)) {
        return res.status(400).json({ message: VALIDATION_ERROR_MESSAGES.invalidViolatorID });
    }
    if (!name || !VALIDATION_PATTERNS.name.test(name)) {
        return res.status(400).json({ message: VALIDATION_ERROR_MESSAGES.invalidName });
    }
    if (!DoB || !VALIDATION_PATTERNS.date.test(DoB)) {
        return res.status(400).json({ message: VALIDATION_ERROR_MESSAGES.invalidDoB });
    }
    if (!email || !VALIDATION_PATTERNS.email.test(email)) {
        return res.status(400).json({ message: VALIDATION_ERROR_MESSAGES.invalidEmail });
    }
    if (!contactNumber || !VALIDATION_PATTERNS.phoneNumber.test(contactNumber)) {
        return res.status(400).json({ message: VALIDATION_ERROR_MESSAGES.invalidContactNumber });
    }
    if (!address || !VALIDATION_PATTERNS.address.test(address)) {
        return res.status(400).json({ message: VALIDATION_ERROR_MESSAGES.invalidAddress });
    }

    // Proceed with saving to the database
    try {
        const newViolator = new Violator({ violatorID, name, DoB, email, contactNumber, address });  // Create a new Violator instance
        const savedViolator = await newViolator.save();  // Save to the database

        // Respond with the saved violator details
        res.status(201).json({
            message: process.env.VIOLATOR_ADD_SUCCESS,
            violator: savedViolator
        });
    } catch (error) {
        console.error('Error adding violator:', error);  // Log the error for debugging

        // Handle errors (e.g., database issues)
        res.status(500).json({
            message: process.env.VIOLATOR_ERROR,
            error: error.message
        });
    }
});



// Get Violator By ID
server.get(process.env.GET_VIOLATOR_ROUTE, async (req, res) => {
    const { id } = req.params;  // Extract the violator ID from the route parameter

    try {
        const violator = await Violator.findById(id);  // Attempt to find the violator by ID
        if (!violator) {
            return res.status(404).json({
                success: false,
                message: process.env.VIOLATOR_NOT_FOUND // Using environment variable for error message
            });
        }
        // If violator is found, return the violator details
        res.json({
            success: true,
            data: violator
        });
    } catch (error) {
        console.error('Error fetching violator:', error);  // Log the error for debugging
        res.status(500).json({
            success: false,
            message: process.env.VIOLATOR_FETCH_ERROR,  // Using environment variable for error message
            error: error.message  // Include the error message for debugging purposes
        });
    }
});






// Route: Delete Violator
server.delete(process.env.DELETE_VIOLATOR_ROUTE, async (req, res) => {
    const violatorID = req.params.id;  // Extract violator ID from the route parameter
    try {
        const result = await Violator.findByIdAndDelete(violatorID);  // Attempt to delete the violator by ID
        if (result) {
            res.json({ success: true, message: process.env.VIOLATOR_DELETE_SUCCESS });  // Success response
        } else {
            res.json({ success: false, message: process.env.VIOLATOR_NOT_FOUND });  // Violator not found
        }
    } catch (error) {
        console.error("Error deleting violator:", error);  // Log the error for debugging
        res.json({ success: false, message: process.env.VIOLATOR_DELETE_ERROR });  // Error response
    }
});



// Update Violator Record By ID
server.put(process.env.UPDATE_VIOLATOR_ROUTE, async (req, res) => {
    const { violatorID } = req.params;  // Get the violatorID from the URL parameter
    const updatedData = req.body;  // Get updated violator details from the request body

    try {
        // Update the violator details using findByIdAndUpdate
        const updatedViolator = await Violator.findByIdAndUpdate(
            violatorID,
            updatedData,
            { new: true, runValidators: true }  // Return updated document and validate the data
        );

        if (!updatedViolator) {
            return res.status(404).json({
                success: false,
                message: process.env.VIOLATOR_NOT_FOUND  // If violator is not found, return a 404 error
            });
        }

        // Return updated violator details in response
        res.json({
            success: true,
            message: process.env.VIOLATOR_UPDATE_SUCCESS,  // Success message from environment variable
            data: updatedViolator  // Updated violator data
        });
    } catch (error) {
        console.error('Error updating violator:', error);  // Log error for debugging
        res.status(500).json({
            success: false,
            message: process.env.VIOLATOR_UPDATE_ERROR,  // Error message from environment variable
            error: error.message  // Include the error message for debugging purposes
        });
    }
});



// Export the router
module.exports = router;