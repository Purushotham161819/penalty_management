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

// API for Bulk Addition of Fines with Validation
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

// API for Bulk Deletion of Fines
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

// API for Bulk Updating Fines - Currently Operational
server.put("/updateBulkFines", upload.single("file"), async (req, res) => {
  try {
    let fines;

    // Check if a file is uploaded
    if (req.file) {
      const { mimetype, buffer } = req.file;

      // Determine file type and parse accordingly
      if (mimetype === "application/json") {
        try {
          fines = JSON.parse(buffer.toString());
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: "Invalid JSON file format.",
          });
        }
      } else if (
        mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        try {
          const workbook = xlsx.read(buffer, { type: "buffer" });
          const sheetName = workbook.SheetNames[0];
          fines = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: "Error parsing Excel file.",
          });
        }
      } else {
        return res.status(400).json({
          success: false,
          message:
            "Invalid file format. Only .json and .xlsx files are supported.",
        });
      }
    } else {
      // Default to JSON body if no file is provided
      fines = req.body;
    }

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

module.exports = server;
