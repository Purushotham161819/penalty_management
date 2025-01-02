const mongoose = require("mongoose");

// Define the schema for supporting documents
const supportingDocumentSchema = new mongoose.Schema({
  fineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fine", // Reference the Fine model
    required: true, // Ensure the document is linked to a fine
  },
  fileName: {
    type: String,
    required: true, // File name is mandatory
  },
  fileType: {
    type: String,
    required: true, // File type is mandatory
    enum: [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ], // Supported MIME types
  },
  fileSize: {
    type: Number,
    required: true, // File size is mandatory
  },
  uploadTimestamp: {
    type: Date,
    default: Date.now, // Automatically set the timestamp to the current date
    required: true,
  },
  filePath: {
    type: String,
    required: true, // Path or URL for the file storage
  },
});

// Create a model using the schema
const SupportingDocument = mongoose.model(
  "SupportingDocument",
  supportingDocumentSchema
);

module.exports = SupportingDocument;
