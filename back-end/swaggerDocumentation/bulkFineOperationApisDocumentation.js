// Swagger Documentation: Add Bulk Fines Endpoint

/**
 * @swagger
 * /addBulkFines:
 *   post:
 *     summary: Upload fines data in bulk
 *     description: Accepts a JSON or Excel file to process fines for violators in bulk.
 *     tags:
 *       - Operations On Bulk Data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   Upload a file containing fines information. Supported file formats:
 *                   - JSON: An array of fines objects with fields violatorID, violation, amount, dueDate.
 *                   - Excel: The first sheet should have columns for violatorID, violation, amount, dueDate.
 *             required:
 *               - file
 *     responses:
 *       201:
 *         description: Fines processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   description: Summary of the operation.
 *                 addedCount:
 *                   type: integer
 *                   description: Number of fines successfully added.
 *                 invalidCount:
 *                   type: integer
 *                   description: Number of fines that could not be processed due to errors.
 *                 invalidFines:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       violatorID:
 *                         type: string
 *                         description: The ID of the violator.
 *                       violation:
 *                         type: string
 *                         description: Description of the violation.
 *                       amount:
 *                         type: number
 *                         description: Amount of the fine.
 *                       dueDate:
 *                         type: string
 *                         format: date
 *                         description: Due date of the fine.
 *                       error:
 *                         type: string
 *                         description: Error message explaining why the record is invalid.
 *       400:
 *         description: Bad Request - Invalid file or data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   description: Error message explaining the issue.
 *                 error:
 *                   type: string
 *                   description: Detailed error message.
 *             examples:
 *               unsupported_file:
 *                 summary: Unsupported file type
 *                 value:
 *                   success: false
 *                   message: "Unsupported file type. Only JSON and Excel files are allowed."
 *               invalid_json:
 *                 summary: Invalid JSON format
 *                 value:
 *                   success: false
 *                   message: "Invalid JSON format in the uploaded file."
 *               invalid_data:
 *                 summary: Invalid data in the file
 *                 value:
 *                   success: false
 *                   message: "Invalid input data. Provide a non-empty array of fines."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   description: Error message indicating server-side failure.
 *                 error:
 *                   type: string
 *                   description: Detailed error message.
 *             examples:
 *               server_error:
 *                 summary: Server processing error
 *                 value:
 *                   success: false
 *                   message: "Failed to process fines."
 *                   error: "Detailed server error message."
 */

//Swagger documentation for Bulk Delete Fines

/**
 * @swagger
 * /deleteBulkFines:
 *   post:
 *     summary: Delete fines for violators in bulk using an uploaded Excel or JSON file.
 *     description: |
 *       This API accepts either an Excel file or a JSON file containing violator IDs. The system will:
 *       - Delete fines for violators with associated fines.
 *       - Return violator IDs that do not exist in the system, along with appropriate reasons.
 *       - The input can be in the form of a JSON file or an Excel file.
 *       - Excel files must contain a sheet with a `violatorID` column.
 *       - JSON files must contain a list of violator IDs.
 *     tags:
 *       - Operations On Bulk Data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   Upload either an Excel or a JSON file with a list of violator IDs.
 *                   If the file is an Excel file, it should have a sheet with a column named `violatorID`.
 *                   If it's a JSON file, it should contain an array of violator IDs.
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: Fines successfully processed for violators.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                 message:
 *                   type: string
 *                   description: Summary message of the operation.
 *                 processedIDs:
 *                   type: integer
 *                   description: Number of violator IDs processed from the uploaded file.
 *                 deletedCount:
 *                   type: integer
 *                   description: Number of fines successfully deleted.
 *                 notFoundViolatorIDs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       violatorID:
 *                         type: string
 *                         description: ID of a violator not found in the system.
 *                       message:
 *                         type: string
 *                         description: Reason why the violator was not found.
 *       400:
 *         description: Bad Request - Invalid file or data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the operation failed due to client error.
 *                 message:
 *                   type: string
 *                   description: Brief message explaining the error.
 *                 error:
 *                   type: string
 *                   description: Detailed error information.
 *             examples:
 *               no_file:
 *                 summary: No file uploaded
 *                 value:
 *                   success: false
 *                   message: "No file uploaded. Please upload an Excel or JSON file."
 *               unsupported_format:
 *                 summary: Unsupported file format
 *                 value:
 *                   success: false
 *                   message: "Unsupported file format. Please upload a valid Excel or JSON file."
 *               invalid_content:
 *                 summary: Invalid data in the file
 *                 value:
 *                   success: false
 *                   message: "The input must contain a non-empty list of violator IDs."
 *       500:
 *         description: Internal Server Error - Processing failure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the operation failed due to server error.
 *                 message:
 *                   type: string
 *                   description: General error message indicating server failure.
 *                 error:
 *                   type: string
 *                   description: Detailed server-side error information.
 *             examples:
 *               server_issue:
 *                 summary: Server processing error
 *                 value:
 *                   success: false
 *                   message: "An error occurred while deleting fines."
 *                   error: "Detailed server error message."
 */

// Swagger to Bulk Update Fines

/**
 * @swagger
 * /updateBulkFines:
 *   put:
 *     summary: Bulk update fine details for multiple violators
 *     description: Allows bulk updating of fine details for multiple violators by uploading a JSON or Excel file. Alternatively, JSON data can be sent in the request body.
 *     tags:
 *       - Operations On Bulk Data
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: A file containing fine details. Supported formats are `.json` and `.xlsx`.
 *           encoding:
 *             file:
 *               contentType:
 *                 - application/json
 *                 - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 violatorID:
 *                   type: string
 *                   description: The unique identifier of the violator.
 *                   example: "12345"
 *                 violation:
 *                   type: string
 *                   description: The description of the violation.
 *                   example: "Speeding"
 *                 amount:
 *                   type: number
 *                   description: The fine amount.
 *                   example: 200
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   description: The due date for the fine.
 *                   example: "2024-12-31"
 *     responses:
 *       200:
 *         description: Bulk update successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Bulk update completed"
 *                 modifiedCount:
 *                   type: integer
 *                   description: The number of records successfully updated.
 *                   example: 5
 *                 invalidCount:
 *                   type: integer
 *                   description: The number of invalid records.
 *                   example: 2
 *                 invalidFines:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       violatorID:
 *                         type: string
 *                       violation:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       dueDate:
 *                         type: string
 *                       error:
 *                         type: string
 *       400:
 *         description: Bad request due to invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid file format. Only .json and .xlsx files are supported."
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to update fines"
 *                 error:
 *                   type: string
 */
