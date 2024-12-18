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
const { multer, fs, xlsx, upload } = require("../dependencies");

// Route to add fine data to the server
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

// Route: Delete Fine Record
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

// Get Fine Record By ID
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

// Update Fine Record By ID
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

// API to add violator details
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

// Get Violator By ID
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

// Route: Delete Violator
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

// Update Violator By ID
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

// Endpoint to retrieve all fines for a specific violator
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

// Bulk Add Violators API
server.post(
  process.env.ADD_BULK_VIOLATORS,
  upload.single("file"),
  async (req, res) => {
    try {
      // Validate file presence
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: process.env.FILE_UPLOAD_ERROR,
        });
      }

      let violators;

      // Check the file type and process accordingly
      if (req.file.mimetype === "application/json") {
        // Parse the uploaded JSON file
        try {
          violators = JSON.parse(req.file.buffer.toString("utf-8"));
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: process.env.JSON_FORMAT_ERROR,
            error: err.message,
          });
        }
      } else if (
        req.file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        // Parse the uploaded Excel file
        try {
          const workbook = xlsx.read(req.file.buffer, { type: "buffer" });

          // Assuming the first sheet contains the violators data
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          violators = xlsx.utils.sheet_to_json(sheet);
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: process.env.EXCEL_FORMAT_ERROR,
            error: err.message,
          });
        }
      }

      // Validate the parsed data
      if (!Array.isArray(violators) || violators.length === 0) {
        return res.status(400).json({
          success: false,
          message: process.env.INVALID_INPUT_ERROR,
        });
      }

      // Insert violators into the database
      await Violator.insertMany(violators);

      res.status(201).json({
        success: true,
        message: process.env.VIOLATORS_ADD_SUCCESS,
      });
    } catch (error) {
      console.error("Error adding violators:", error);
      res.status(500).json({
        success: false,
        message: process.env.VIOLATORS_ERROR,
        error: error.message,
      });
    }
  }
);

// Bulk Add Fines API - Validates fines and processes only valid ones
server.post(
  process.env.ADD_BULK_FINES,
  upload.single("file"),
  async (req, res) => {
    try {
      // Validate file presence
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: process.env.FILE_UPLOAD_ERROR,
        });
      }

      let fines = [];
      // Process JSON file
      if (req.file.mimetype === "application/json") {
        try {
          fines = JSON.parse(req.file.buffer.toString("utf-8"));
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: process.env.JSON_FORMAT_ERROR,
            error: err.message,
          });
        }
      }
      // Process Excel file
      else if (
        req.file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        try {
          const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          fines = xlsx.utils.sheet_to_json(sheet); // Convert sheet to JSON array
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: process.env.PARSING_ERROR,
            error: err.message,
          });
        }
      }

      // Validate fines data
      if (!Array.isArray(fines) || fines.length === 0) {
        return res.status(400).json({
          success: false,
          message: process.env.INVALID_INPUT_FINES_ERROR,
        });
      }

      const validFines = [];
      const invalidFines = [];

      for (let fine of fines) {
        const { violatorID, violation, amount, dueDate } = fine;

        if (violatorID && violation && amount && dueDate) {
          try {
            // Fetch the ObjectId for the violator
            const violator = await Violator.findOne({ violatorID }).select(
              "_id"
            );

            if (violator) {
              validFines.push({
                violator: violator._id,
                violation,
                amount,
                dueDate: new Date(dueDate),
                fineCreatedDate: new Date(),
              });
            } else {
              invalidFines.push({
                ...fine,
                error: `Violator with ID ${violatorID} not found.`,
              });
            }
          } catch (fetchError) {
            invalidFines.push({
              ...fine,
              error: `Error fetching violator: ${fetchError.message}`,
            });
          }
        } else {
          invalidFines.push({
            ...fine,
            error: process.env.MISSED_REQUIRED_FIELDS,
          });
        }
      }

      // Insert valid fines
      if (validFines.length > 0) {
        await Fine.insertMany(validFines);
      }

      res.status(201).json({
        success: true,
        message: process.env.ADD_BULKFINES_COMPLETED,
        addedCount: validFines.length,
        invalidCount: invalidFines.length,
        invalidFines,
      });
    } catch (error) {
      console.error("Error adding fines:", error);
      res.status(500).json({
        success: false,
        message: process.env.FINES_ERROR,
        error: error.message,
      });
    }
  }
);

//Bulk Delete Fines API
server.post(
  process.env.DELETE_BULK_FINES_ROUTE,
  upload.single("file"),
  async (req, res) => {
    try {
      // Handle JSON request body if present
      let violatorIDs = [];

      // Check if the request is a JSON request
      if (req.is("application/json")) {
        // If JSON data is present, extract violatorIDs from the request body
        if (
          req.body.violatorIDs &&
          Array.isArray(req.body.violatorIDs) &&
          req.body.violatorIDs.length > 0
        ) {
          violatorIDs = req.body.violatorIDs.filter(Boolean); // Ensure IDs are non-empty
        } else {
          return res.status(400).json({
            success: false,
            message: process.env.INVALID_IDS,
          });
        }
      } else if (req.file) {
        // If a file is uploaded, proceed with file processing

        // Validate file format
        const validMimeTypes = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
        ];
        if (!validMimeTypes.includes(req.file.mimetype)) {
          return res.status(400).json({
            success: false,
            message: process.env.UNSUPPORTED_FILE,
          });
        }

        // Parse Excel file
        try {
          const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = xlsx.utils.sheet_to_json(sheet);
          violatorIDs = data.map((row) => row.violatorID).filter(Boolean); // Extract IDs and filter out empty values
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: process.env.EXCEL_PARSING_ERROR,
            error: err.message,
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message: process.env.NO_FILE_UPLOAD,
        });
      }

      // Validate extracted IDs
      if (violatorIDs.length === 0) {
        return res.status(400).json({
          success: false,
          message: process.env.NON_EMPTY_LIST,
        });
      }

      // Remove duplicate IDs
      violatorIDs = [...new Set(violatorIDs)];

      // Fetch violators from the database
      const violators = await Violator.find({
        violatorID: { $in: violatorIDs },
      });
      const existingViolatorIDs = violators.map(
        (violator) => violator.violatorID
      );

      // Categorize violator IDs that do not exist
      const notFoundViolatorIDs = violatorIDs
        .filter((id) => !existingViolatorIDs.includes(id))
        .map((id) => ({ violatorID: id, message: process.env.NO_VIOLATOR }));

      // Fetch fines for existing violators
      const fines = await Fine.find({
        violator: { $in: violators.map((violator) => violator._id) },
      });

      // Map violator IDs with fines
      const violatorIDsWithFines = fines.map((fine) =>
        fine.violator.toString()
      );

      // Delete fines for violator IDs with fines
      const deleteResult = await Fine.deleteMany({
        violator: { $in: violatorIDsWithFines },
      });

      // Prepare response
      res.status(200).json({
        success: true,
        message: process.env.PROCESS_COMPLETED,
        processedIDs: violatorIDs.length,
        deletedCount: deleteResult.deletedCount,
        notFoundViolatorIDs,
      });
    } catch (error) {
      console.error("Error deleting bulk fines:", error);
      res.status(500).json({
        success: false,
        message: process.env.DELETE_FINES_ERROR,
        error: error.message,
      });
    }
  }
);

//Bulk update Fines API - Currently working
server.put("/updateFines", async (req, res) => {
  try {
    const fines = req.body; // Array of fines in the specified format

    // Validate input
    if (!Array.isArray(fines) || fines.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid input data. Provide a non-empty array of fines to update.",
      });
    }

    const bulkOperations = [];
    const invalidFines = [];

    // Resolve violatorID to _id and prepare bulk operations
    for (let fine of fines) {
      const { violatorID, violation, amount, dueDate } = fine;

      if (violatorID && (violation || amount || dueDate)) {
        try {
          const violator = await Violator.findOne({ violatorID });

          if (violator) {
            bulkOperations.push({
              updateOne: {
                filter: { violator: violator._id },
                update: {
                  $set: {
                    ...(violation && { violation }),
                    ...(amount && { amount }),
                    ...(dueDate && { dueDate: new Date(dueDate) }),
                  },
                },
              },
            });
          } else {
            invalidFines.push({
              ...fine,
              error: "Violator not found.",
            });
          }
        } catch (error) {
          invalidFines.push({
            ...fine,
            error: `Error resolving violator: ${error.message}`,
          });
        }
      } else {
        invalidFines.push({
          ...fine,
          error: "Missing required fields (violatorID or update fields).",
        });
      }
    }

    // Execute bulk update
    if (bulkOperations.length > 0) {
      const result = await Fine.bulkWrite(bulkOperations);

      res.status(200).json({
        success: true,
        message: "Bulk update completed",
        modifiedCount: result.modifiedCount,
        invalidCount: invalidFines.length,
        invalidFines, // Include invalid fines for review
      });
    } else {
      res.status(400).json({
        success: false,
        message: "No valid fines to update.",
        invalidFines,
      });
    }
  } catch (error) {
    console.error("Error updating fines:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update fines",
      error: error.message,
    });
  }
});

// Export the router
module.exports = router;
