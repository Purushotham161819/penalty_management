// Import necessary dependencies from dependencies.js
const {
  server,
  Fine,
  router,
  mongoose,
  VALIDATION_PATTERNS,
  VALIDATION_ERROR_MESSAGES,
} = require("../dependencies");
const uploadDocuments = require("../config/uploadDocuments");
const SupportingDocument = require("../models/supportingDocumentSchema");

// API endpoint to upload a supporting document
server.post(
  process.env.UPLOAD_SUPPORTING_DOCUMENT_ROUTE,
  uploadDocuments.single("document"),
  async (req, res) => {
    try {
      const { fineId } = req.params;
      const file = req.file;

      if (!file) {
        return res
          .status(400)
          .json({ message: process.env.NO_FILE_UPLOADED_MESSAGE });
      }

      // Save file metadata to the database
      const document = new SupportingDocument({
        fineId,
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
        filePath: file.path,
      });

      await document.save();

      res.status(201).json({
        message: process.env.DOCUMENT_UPLOADED_SUCCESS_MESSAGE,
        document,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// API endpoint to delete a supporting document
server.delete(process.env.DELETE_SUPPORTING_DOCUMENT_ROUTE, async (req, res) => {
  try {
    const { fineId, documentId } = req.params;

    // Find the document in the database
    const document = await SupportingDocument.findOne({ _id: documentId, fineId });

    if (!document) {
      return res.status(404).json({ message: process.env.DOCUMENT_NOT_FOUND_MESSAGE });
    }

    // Delete the file from the file system
    const fs = require("fs");
    fs.unlink(document.filePath, async (err) => {
      if (err) {
        console.error("Error deleting the file:", err.message);
        return res.status(500).json({ message: process.env.FILE_DELETE_FAILURE_MESSAGE });
      }

      // Remove the document metadata from the database
      await SupportingDocument.deleteOne({ _id: documentId });

      res.status(200).json({ message: process.env.DOCUMENT_DELETE_SUCCESS_MESSAGE });
    });
  } catch (error) {
    console.error("Error in deleting document:", error.message);
    res.status(500).json({ message: process.env.UNEXPECTED_ERROR_MESSAGE });
  }
});


// API endpoint to update a supporting document
server.put(
  process.env.UPDATE_SUPPORTING_DOCUMENT_ENDPOINT,
  uploadDocuments.single("document"),
  async (req, res) => {

    try {
      const { fineId, documentId } = req.params;
      const file = req.file;

      // Find the existing document
      const existingDocument = await SupportingDocument.findOne({
        _id: documentId,
        fineId: fineId,
      });

      if (!existingDocument) {
        return res.status(404).json({
          message: process.env.DOCUMENT_NOT_FOUND_FOR_UPDATE_MESSAGE,
        });
      }

      // If a new file is uploaded, replace the old file
      if (file) {
        // Delete the existing file from the directory
        if (fs.existsSync(existingDocument.filePath)) {
          fs.unlinkSync(existingDocument.filePath);
        }

        // Update the file details in the database
        existingDocument.fileName = file.originalname;
        existingDocument.fileType = file.mimetype;
        existingDocument.fileSize = file.size;
        existingDocument.filePath = file.path;
      }

      // Update additional metadata (if needed) from request body
      if (req.body.fileName) {
        existingDocument.fileName = req.body.fileName;
      }

      // Save the updated document
      await existingDocument.save();

      res.status(200).json({
        message: process.env.DOCUMENT_UPDATED_SUCCESSFULLY_MESSAGE,
        document: existingDocument,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = server;
