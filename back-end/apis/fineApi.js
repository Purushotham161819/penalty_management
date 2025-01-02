// Import necessary dependencies from dependencies.js
const {
  server,
  Fine,
  router,
  mongoose,
  VALIDATION_PATTERNS,
  VALIDATION_ERROR_MESSAGES,
} = require("../dependencies");

// Import the Violator model
const Violator = require("../models/violator");

// API to Add Fine Data to the Server
server.post(process.env.ADD_FINE_ROUTE, async (req, res) => {
  const { violatorID, violation, amount, dueDate } = req.body;

  // Validate input fields
  if (!violatorID || !VALIDATION_PATTERNS.id.test(violatorID)) {
    return res
      .status(400)
      .json({ message: VALIDATION_ERROR_MESSAGES.invalidViolatorID });
  }
  if (!violation || !VALIDATION_PATTERNS.name.test(violation)) {
    return res
      .status(400)
      .json({ message: VALIDATION_ERROR_MESSAGES.invalidViolation });
  }
  if (!amount || !VALIDATION_PATTERNS.number.test(amount)) {
    return res
      .status(400)
      .json({ message: VALIDATION_ERROR_MESSAGES.invalidAmount });
  }
  if (!dueDate || !VALIDATION_PATTERNS.date.test(dueDate)) {
    return res
      .status(400)
      .json({ message: VALIDATION_ERROR_MESSAGES.invalidDueDate });
  }

  try {
    // Find the violator by their ID
    const violator = await Violator.findOne({ violatorID });
    if (!violator) {
      return res
        .status(404)
        .json({ message: VALIDATION_ERROR_MESSAGES.violatorNotFound });
    }

    // Create a new Fine document
    const newFine = new Fine({
      violator: violator._id, // Reference the violator's ObjectId
      violation,
      amount,
      dueDate,
      fineCreatedDate: new Date(), // Explicitly set fineCreatedDate to current date
    });

    // Save the fine to the database
    await newFine.save();

    // Respond with success message
    res.status(201).json({
      message: process.env.FINE_ADD_SUCCESS,
      fine: newFine,
    });
  } catch (error) {
    console.error("Error saving fine:", error);
    res.status(500).json({ message: process.env.FINE_ADD_ERROR });
  }
});

// API to Delete Fine Record by ID
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

// API to Retrieve Fine Record by ID
server.get(process.env.GET_RECORD_ROUTE, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Fine.findById(id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: process.env.RECORD_NOT_FOUND, // Using environment variable
      });
      return; // Exit the function after sending the response
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching record:", error);
    res.status(500).json({
      success: false,
      message: process.env.FETCH_RECORD_ERROR, // Using environment variable
    });
  }
});

// API to Update Fine Record by ID
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
        message: process.env.RECORD_NOT_FOUND,
      });
    }

    res.json({
      success: true,
      message: process.env.RECORD_UPDATE_SUCCESS,
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating record:", error); // Log error for debugging
    res.status(500).json({
      success: false,
      message: process.env.RECORD_UPDATE_ERROR, // Using environment variable
      error: error.message, // Include error details for client debugging (optional)
    });
  }
});


module.exports=server;