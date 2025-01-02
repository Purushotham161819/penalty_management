// Swagger Documentation: Add Bulk Violators Endpoint

/**
 * @swagger
 * /addBulkViolators:
 *   post:
 *     tags:
 *       - Operations On Bulk Data
 *     summary: Bulk upload violators from a JSON or Excel file
 *     description: This endpoint allows users to upload a file (either JSON or Excel format) containing an array of violators. The violators will be validated and added to the database.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file containing violator data in either JSON or Excel format.
 *           required:
 *             - file
 *     responses:
 *       201:
 *         description: Violators added successfully
 *         content:
 *           application/json:
 *             examples:
 *               success:
 *                 value:
 *                   {
 *                     "success": true,
 *                     "message": "Violators added successfully"
 *                   }
 *       400:
 *         description: Bad Request - Invalid input or file format
 *         content:
 *           application/json:
 *             examples:
 *               invalidFormat:
 *                 value:
 *                   {
 *                     "success": false,
 *                     "message": "Invalid JSON format in the uploaded file."
 *                   }
 *               invalidExcelFormat:
 *                 value:
 *                   {
 *                     "success": false,
 *                     "message": "Invalid Excel format in the uploaded file."
 *                   }
 *               noFileUploaded:
 *                 value:
 *                   {
 *                     "success": false,
 *                     "message": "No file uploaded. Please upload a JSON or Excel file."
 *                   }
 *               invalidData:
 *                 value:
 *                   {
 *                     "success": false,
 *                     "message": "Invalid input data. Provide an array of violators."
 *                   }
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             examples:
 *               serverError:
 *                 value:
 *                   {
 *                     "success": false,
 *                     "message": "Failed to add violators",
 *                     "error": "Detailed error message"
 *                   }
 */


// Swagger Documentation: Delete Bulk Violators Endpoint

/**
 * @swagger
 * /deleteBulkViolators:
 *   post:
 *     summary: Bulk Delete Violators
 *     description: |
 *       This API accepts either an Excel file or a JSON file containing violator IDs. The system will:
 *       - Delete violators with associated IDs.
 *       - Return violator IDs that do not exist in the database, along with appropriate reasons.
 *       - The input file can either be a JSON file or an Excel file.
 *       - Excel files must contain a sheet with a `violatorID` column.
 *       - JSON files must contain an array of violator IDs.
 *       - If any errors occur during the deletion process, they will be logged, and the system will continue to process the remaining records.
 *       - If the file is invalid (unsupported format or incorrect content), a detailed error message will be returned.
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
 *         description: Violators successfully deleted.
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
 *                 violatorNotFound:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: List of violator IDs that were not found in the database.
 *                   example: ['V999', 'V888']
 *       400:
 *         description: Invalid file type or file format.
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
 *                   description: Error message indicating why the file was invalid.
 *             examples:
 *               no_file:
 *                 summary: No file uploaded
 *                 value:
 *                   success: false
 *                   message: "No file uploaded. Please upload a JSON or Excel file."
 *               unsupported_format:
 *                 summary: Unsupported file format
 *                 value:
 *                   success: false
 *                   message: "Unsupported file format. Only JSON and Excel files are allowed!"
 *               invalid_content:
 *                 summary: Invalid content in file
 *                 value:
 *                   success: false
 *                   message: "The uploaded file must contain a list of violator IDs."
 *       500:
 *         description: Internal Server Error (processing or database failure).
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
 *                   description: General error message.
 *                 error:
 *                   type: string
 *                   description: Detailed error message indicating the cause of the failure.
 *             examples:
 *               database_error:
 *                 summary: Database connection issue
 *                 value:
 *                   success: false
 *                   message: "An error occurred while deleting the violators."
 *                   error: "Database connection failed."
 */


//Swagger documentation for Bulk update violators

/**
 * @swagger
 * /updateBulkViolators:
 *   put:
 *     summary: Update multiple violator details, including personal and address information, from an uploaded JSON or Excel file.
 *     description: |
 *       This endpoint allows the user to upload a JSON or Excel file to update violator details. The file must adhere to the structure defined in the violator schema, which includes the following fields:
 *       - **violatorID**: Unique identifier for the violator (mandatory).
 *       - **firstName**: First name of the violator.
 *       - **lastName**: Last name of the violator.
 *       - **DoB**: Date of birth in YYYY-MM-DD format.
 *       - **email**: Email address of the violator.
 *       - **contactNumber**: Contact number of the violator.
 *       - **address**: Object containing the violator's address details, including the following subfields:
 *         - **street**: Street address.
 *         - **apartment**: Apartment number (optional).
 *         - **city**: City or town.
 *         - **state**: State.
 *         - **zipCode**: ZIP code.
 *       If any of the provided fields are present in the uploaded file, they will be updated for the corresponding violator.
 *
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
 *                 description: The file to upload (JSON or Excel) containing violator information, including personal details and address fields.
 *           encoding:
 *             file:
 *               contentType: 
 *                 - application/json
 *                 - application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
 *     responses:
 *       200:
 *         description: Successfully processed the file and updated violator details, including personal and address information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the operation.
 *                 violatorDoesNotExist:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of violator IDs not found in the database.
 *                 updateSuccess:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Array of violator IDs successfully updated.
 *                 updateFailures:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       violatorID:
 *                         type: string
 *                         description: The violator ID that failed to update.
 *                       error:
 *                         type: string
 *                         description: Error message describing the failure.
 *       400:
 *         description: Bad request, invalid file type, missing data, or improperly structured file.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the operation.
 *                 message:
 *                   type: string
 *                   description: Explanation of the failure, e.g., unsupported file type or missing required fields.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the operation.
 *                 message:
 *                   type: string
 *                   description: Error message describing the server failure.
 * 
 * definitions:
 *   Violator:
 *     type: object
 *     required:
 *       - violatorID
 *       - firstName
 *       - lastName
 *       - DoB
 *       - email
 *       - contactNumber
 *     properties:
 *       violatorID:
 *         type: string
 *         description: Unique identifier for the violator.
 *       firstName:
 *         type: string
 *         description: First name of the violator.
 *       lastName:
 *         type: string
 *         description: Last name of the violator.
 *       DoB:
 *         type: string
 *         format: date
 *         description: Date of birth of the violator.
 *       email:
 *         type: string
 *         description: Email address of the violator.
 *       contactNumber:
 *         type: string
 *         description: Contact number of the violator.
 *       address:
 *         type: object
 *         description: Address object containing the violator's address information. If any address fields are provided, they will be updated.
 *         properties:
 *           street:
 *             type: string
 *             description: Street address of the violator.
 *           apartment:
 *             type: string
 *             description: Apartment number (optional).
 *           city:
 *             type: string
 *             description: City or town of the violator.
 *           state:
 *             type: string
 *             description: State of the violator.
 *           zipCode:
 *             type: string
 *             description: ZIP code of the violator.
 */
