// Import necessary dependencies from dependencies.js
const { server, Fine, router, mongoose, VALIDATION_PATTERNS, VALIDATION_ERROR_MESSAGES } = require('../dependencies'); 



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

// Export the router
module.exports = router;