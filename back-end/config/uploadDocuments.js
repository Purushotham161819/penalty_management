const multer = require("multer");
const path = require("path");

// Ensure the directory exists at startup
const fs = require("fs");
const documentsDir = path.join(__dirname, "supporting_documents");
if (!fs.existsSync(documentsDir)) {
  fs.mkdirSync(documentsDir);  // Create the directory if it doesn't exist
}

// Configure multer for uploading documents
const uploadDocuments = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, documentsDir);  // Store the file in the 'supporting_documents' directory
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));  // Add extension based on the original file
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type. Only PDF, DOCX, JPG, or PNG files are allowed."), false);
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },  // Limit file size to 5 MB
});

module.exports = uploadDocuments;
