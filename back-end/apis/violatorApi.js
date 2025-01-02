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

// API to Add New Violator Details
server.post(process.env.ADD_VIOLATOR_ROUTE, async (req, res) => {
  const {
    violatorID,
    firstName,
    lastName,
    DoB,
    email,
    contactNumber,
    address,
  } = req.body;

  // Validate input fields
  if (!violatorID || !VALIDATION_PATTERNS.id.test(violatorID)) {
    return res
      .status(400)
      .json({ message: VALIDATION_ERROR_MESSAGES.invalidViolatorID });
  }
  if (!firstName || !VALIDATION_PATTERNS.name.test(firstName)) {
    return res
      .status(400)
      .json({ message: VALIDATION_ERROR_MESSAGES.invalidName });
  }
  if (!lastName || !VALIDATION_PATTERNS.name.test(lastName)) {
    return res
      .status(400)
      .json({ message: VALIDATION_ERROR_MESSAGES.invalidName });
  }
  if (!DoB || !VALIDATION_PATTERNS.date.test(DoB)) {
    return res
      .status(400)
      .json({ message: VALIDATION_ERROR_MESSAGES.invalidDoB });
  }
  if (!email || !VALIDATION_PATTERNS.email.test(email)) {
    return res
      .status(400)
      .json({ message: VALIDATION_ERROR_MESSAGES.invalidEmail });
  }
  if (!contactNumber || !VALIDATION_PATTERNS.phoneNumber.test(contactNumber)) {
    return res
      .status(400)
      .json({ message: VALIDATION_ERROR_MESSAGES.invalidContactNumber });
  }
  if (!address || !VALIDATION_PATTERNS.address.test(address)) {
    return res
      .status(400)
      .json({ message: VALIDATION_ERROR_MESSAGES.invalidAddress });
  }

  // Proceed with saving to the database
  try {
    const newViolator = new Violator({
      violatorID,
      firstName,
      lastName,
      DoB,
      email,
      contactNumber,
      address,
    }); // Create a new Violator instance
    const savedViolator = await newViolator.save(); // Save to the database

    // Respond with the saved violator details
    res.status(201).json({
      message: process.env.VIOLATOR_ADD_SUCCESS,
      violator: savedViolator,
    });
  } catch (error) {
    console.error("Error adding violator:", error); // Log the error for debugging

    // Handle errors (e.g., database issues)
    res.status(500).json({
      message: process.env.VIOLATOR_ERROR,
      error: error.message,
    });
  }
});

// API to Retrieve Violator Details by ID
server.get(process.env.GET_VIOLATOR_ROUTE, async (req, res) => {
  const { id } = req.params; // Extract the violator ID from the route parameter

  try {
    const violator = await Violator.findById(id); // Attempt to find the violator by ID
    if (!violator) {
      return res.status(404).json({
        success: false,
        message: process.env.VIOLATOR_NOT_FOUND, // Using environment variable for error message
      });
    }
    // If violator is found, return the violator details
    res.json({
      success: true,
      data: violator,
    });
  } catch (error) {
    console.error("Error fetching violator:", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: process.env.VIOLATOR_FETCH_ERROR, // Using environment variable for error message
      error: error.message, // Include the error message for debugging purposes
    });
  }
});

// API to Delete Violator by ID
server.delete(process.env.DELETE_VIOLATOR_ROUTE, async (req, res) => {
  const violatorID = req.params.id; // Extract violator ID from the route parameter
  try {
    const result = await Violator.findByIdAndDelete(violatorID); // Attempt to delete the violator by ID
    if (result) {
      res.json({ success: true, message: process.env.VIOLATOR_DELETE_SUCCESS }); // Success response
    } else {
      res.json({ success: false, message: process.env.VIOLATOR_NOT_FOUND }); // Violator not found
    }
  } catch (error) {
    console.error("Error deleting violator:", error); // Log the error for debugging
    res.json({ success: false, message: process.env.VIOLATOR_DELETE_ERROR }); // Error response
  }
});

// API to Update Violator Information by ID
server.put(process.env.UPDATE_VIOLATOR_ROUTE, async (req, res) => {
  const { id } = req.params; // Extract the violator ID from the route parameter
  const updatedData = req.body; // Extract the updated violator details from the request body

  try {
    // Find and update the violator record using MongoDB Object ID
    const updatedViolator = await Violator.findByIdAndUpdate(
      id, // Use the MongoDB ObjectId to search for the violator
      updatedData, // Data to update
      { new: true, runValidators: true } // Ensure we return the updated document and validate data
    );

    // If no violator is found, return a 404 error
    if (!updatedViolator) {
      return res.status(404).json({
        success: false,
        message: process.env.VIOLATOR_NOT_FOUND, // Use environment variable or fallback
      });
    }

    // Respond with success and the updated violator data
    res.status(200).json({
      success: true,
      message: process.env.VIOLATOR_UPDATE_SUCCESS, // Success message
      data: updatedViolator, // Return the updated violator record
    });
  } catch (error) {
    console.error("Error updating violator:", error); // Log error for debugging
    res.status(500).json({
      success: false,
      message: process.env.VIOLATOR_UPDATE_ERROR, // Error message
      error: error.message, // Include error details for debugging
    });
  }
});

// API to Retrieve All Fines for a Specific Violator
server.get(process.env.RETRIEVE_ALL_FINES, async (req, res) => {
  try {
    const { violatorID } = req.params;

    // Step 1: Find the Violator by violatorID
    const violator = await Violator.findOne({ violatorID });

    // Step 2: If violator does not exist, return error
    if (!violator) {
      return res.status(404).json({
        success: false,
        message: process.env.VIOLATOR_NOT_FOUND,
      });
    }

    // Step 3: Retrieve all fines associated with this violator
    const fines = await Fine.find({ violator: violator._id });

    // Step 4: Return fines data if fines exist
    if (fines.length > 0) {
      return res.status(200).json({
        success: true,
        violatorID,
        fines,
      });
    } else {
      // If no fines found, return appropriate message
      return res.status(200).json({
        success: true,
        violatorID,
        message: process.env.NO_FINES,
      });
    }
  } catch (error) {
    // Step 5: Error handling
    console.error("Error retrieving fines:", error);
    return res.status(500).json({
      success: false,
      message: process.env.RETRIEVING_FINES_ERROR,
      error: error.message,
    });
  }
});

module.exports = server;
