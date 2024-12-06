// Import necessary dependencies from dependencies.js
const { server, Fine, router, mongoose } = require('../dependencies'); // Adjust path as needed



// Route to add data to fine to server
server.post('/add', async (req, res) => {
    const { firstName, lastName, violation, amount, dueDate } = req.body;

    // Check if all required fields are provided
    if (firstName && lastName && violation && amount && dueDate) {
        try {
            const newFine = new Fine({ firstName, lastName, violation, amount, dueDate }); // Create a new document
            await newFine.save(); // Save to the database
            res.status(201).json({ message: process.env.FINE_ADD_SUCCESS }); // Success response
        } catch (error) {
            console.error('Error saving fine:', error); // Log the error
            res.status(500).json({ message: process.env.FINE_ADD_ERROR }); // Failure response
        }
    } else {
        // Handle missing fields
        res.status(400).json({ message: process.env.ALL_FIELDS_REQUIRED });
    }
});


// Route: Delete Record
server.delete('/delete/:id', async (req, res) => {
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
server.get('/getRecord/:id', async (req, res) => {
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
server.put('/updateRecord/:id', async (req, res) => {
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