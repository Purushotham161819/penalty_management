// Import necessary dependencies from dependencies.js
const {
  server,
  Fine,
  router,
  mongoose,
  VALIDATION_PATTERNS,
  VALIDATION_ERROR_MESSAGES,
} = require("../dependencies");
const { multer, fs, xlsx, upload } = require("../dependencies");
// Import the Violator model
const Violator = require("../models/violator");

// API for Bulk Addition of Violators
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

// API for Bulk Deletion of Violators
server.post(
  process.env.DELETE_BULK_VIOLATORS,
  upload.single("file"),
  async (req, res) => {
    try {
      // Validate that a file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: process.env.NO_FILE_UPLOAD,
        });
      }

      // Parse the file based on its type
      let violatorIDs = [];
      try {
        if (req.file.mimetype === "application/json") {
          // Parse JSON file
          violatorIDs = JSON.parse(req.file.buffer.toString());
        } else if (
          req.file.mimetype ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
          // Parse Excel file
          const workbook = xlsx.read(req.file.buffer);
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const data = xlsx.utils.sheet_to_json(sheet);
          violatorIDs = data.map((row) => row.violatorID);
        } else {
          return res.status(400).json({
            success: false,
            message: process.env.UNSUPPORTED_FILE,
          });
        }
      } catch (parseError) {
        return res.status(400).json({
          success: false,
          message: process.env.PARSING_ERROR,
          error: parseError.message,
        });
      }

      // Initialize variables
      const violatorNotFound = [];
      let deletedCount = 0;

      // Loop through each violatorID and process the deletion
      for (let violatorID of violatorIDs) {
        try {
          const violator = await Violator.findOne({ violatorID });

          if (!violator) {
            violatorNotFound.push(violatorID); // Add to not found list
          } else {
            await Violator.deleteOne({ violatorID }); // Delete the violator
            deletedCount++; // Increment count of deleted violators
          }
        } catch (dbError) {
          console.error(
            `Error deleting violator with ID: ${violatorID}`,
            dbError
          );
          // Handle individual violator deletion failure without crashing the loop
          continue;
        }
      }

      // Respond with a summary of the operation
      return res.status(200).json({
        success: true,
        message: process.env.BULK_DELETE_VIOLATORS_SUCCESS,
        violatorNotFound,
      });
    } catch (error) {
      console.error("Error in deleteBulkViolators API:", error);
      return res.status(500).json({
        success: false,
        message: process.env.INTERNAL_SERVER_ERROR,
        error: error.message,
      });
    }
  }
);

// API for Bulk Update of Violator Information
server.put(
  process.env.BULK_UPDATE_VIOLATOR_ROUTE,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: process.env.NO_FILE_UPLOAD,
        });
      }

      let parsedData;
      if (req.file.mimetype === "application/json") {
        parsedData = JSON.parse(req.file.buffer.toString());
      } else if (
        req.file.mimetype ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        parsedData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        parsedData = parsedData.map((record) => {
          if (
            record["address.street"] ||
            record["address.apartment"] ||
            record["address.city"] ||
            record["address.state"] ||
            record["address.zipCode"]
          ) {
            record.address = {
              street: record["address.street"] || undefined,
              apartment: record["address.apartment"] || undefined,
              city: record["address.city"] || undefined,
              state: record["address.state"] || undefined,
              zipCode: record["address.zipCode"] || undefined,
            };
          }
          return record;
        });
      } else {
        return res.status(400).json({
          success: false,
          message: process.env.UNSUPPORTED_FILE,
        });
      }

      const violatorDoesNotExist = [];
      const updateSuccess = [];
      const updateFailures = [];

      for (const record of parsedData) {
        const {
          violatorID,
          firstName,
          lastName,
          DoB,
          email,
          contactNumber,
          address,
        } = record;

        if (!violatorID) {
          updateFailures.push({
            violatorID: "N/A",
            error: "Missing violatorID in record.",
          });
          continue;
        }

        const existingViolator = await Violator.findOne({ violatorID });
        if (!existingViolator) {
          violatorDoesNotExist.push(violatorID);
          continue;
        }

        if (address && typeof address !== "object") {
          updateFailures.push({
            violatorID,
            error: "Invalid or missing address field.",
          });
          continue;
        }

        const updateData = {
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
          ...(DoB && { DoB: new Date(DoB) }),
          ...(email && { email }),
          ...(contactNumber && { contactNumber }),
          ...(address && {
            ...(address.street && { "address.street": address.street }),
            ...(address.apartment && {
              "address.apartment": address.apartment,
            }),
            ...(address.city && { "address.city": address.city }),
            ...(address.state && { "address.state": address.state }),
            ...(address.zipCode && { "address.zipCode": address.zipCode }),
          }),
        };
        try {
          await Violator.updateOne(
            { violatorID },
            { $set: updateData },
            { runValidators: true }
          );
          updateSuccess.push(violatorID);
        } catch (error) {
          updateFailures.push({ violatorID, error: error.message });
        }
      }
      res.status(200).json({
        success: true,
        message: process.env.BULK_UPDATE_VIOLATOR_SUCCESS_MESSAGE,
        violatorDoesNotExist,
        updateSuccess,
        updateFailures,
      });
    } catch (error) {
      console.error("Error processing violator updates:", error);
      res.status(500).json({
        success: false,
        message: process.env.PROCESSING_ERROR_MESSAGE,
        error: error.message,
      });
    }
  }
);
