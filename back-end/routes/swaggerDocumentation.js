// Swagger Documentation: Add Fine Record Endpoint

/**
 * @swagger
 * /addFine:
 *   post:
 *     tags:
 *       - Fine Management
 *     summary: Add a fine to a violator
 *     description: This endpoint allows an admin to add a fine to a violator, including validation checks on the input fields. The fine is associated with the violator based on their unique violatorID, and it includes details such as the violation, amount, and due date.
 *     operationId: addFine
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               violatorID:
 *                 type: string
 *                 description: The unique ID of the violator.
 *                 example: "V12345"
 *               violation:
 *                 type: string
 *                 description: The type of violation committed by the violator.
 *                 example: "Speeding"
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The amount of the fine.
 *                 example: 150.00
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: The due date for the fine payment.
 *                 example: "2024-12-31"
 *     responses:
 *       201:
 *         description: Fine successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Fine added successfully"
 *                 fine:
 *                   type: object
 *                   properties:
 *                     violator:
 *                       type: string
 *                       description: The ID of the violator.
 *                       example: "V12345"
 *                     violation:
 *                       type: string
 *                       description: The type of violation committed.
 *                       example: "Speeding"
 *                     amount:
 *                       type: number
 *                       format: float
 *                       description: The amount of the fine.
 *                       example: 150.00
 *                     dueDate:
 *                       type: string
 *                       format: date
 *                       description: The due date for the fine payment.
 *                       example: "2024-12-31"
 *                     fineCreatedDate:
 *                       type: string
 *                       format: date-time
 *                       description: The date the fine was created.
 *                       example: "2024-12-01T12:00:00Z"
 *       400:
 *         description: Invalid input parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid violator ID"
 *       404:
 *         description: Violator not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Violator not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error adding fine"
 */

// Swagger Documentation: Delete Fine Record Endpoint

/**
 * @swagger
 * /deleteFine/{id}:
 *   delete:
 *     summary: Delete a fine record
 *     description: Deletes a fine record based on the provided record ID.
 *     tags:
 *       - Fine Management
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the fine record to delete
 *         schema:
 *           type: string
 *           example: 64faacfd8d9f6b001e8f9e72
 *     responses:
 *       200:
 *         description: Record deletion response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Status message for the operation
 *                   example: Record deleted successfully!
 *       404:
 *         description: Record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Reason for failure
 *                   example: Record not found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Reason for failure
 *                   example: Error deleting the record.
 */

// Swagger Documentation: Get Fine Record by ID Endpoint

/**
 * @swagger
 * /getFine/{id}:
 *   get:
 *     summary: Get a fine record by ID
 *     description: Fetches a fine record from the database based on the provided record ID.
 *     tags:
 *       - Fine Management
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the fine record to fetch
 *         schema:
 *           type: string
 *           example: 64faacfd8d9f6b001e8f9e72
 *     responses:
 *       200:
 *         description: Record fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: The fine record data
 *                   properties:
 *                     violatorID:
 *                       type: string
 *                       description: Unique identifier for the violator
 *                       example: V12345
 *                     violation:
 *                       type: string
 *                       description: The violation details
 *                       example: Speeding
 *                     amount:
 *                       type: number
 *                       description: Fine amount
 *                       example: 150
 *                     dueDate:
 *                       type: string
 *                       format: date
 *                       description: The due date for the fine payment
 *                       example: 2024-12-31
 *       404:
 *         description: Record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Reason for failure
 *                   example: "Record not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Reason for failure
 *                   example: "Error fetching the record"
 *                 error:
 *                   type: string
 *                   description: Error details for debugging (optional)
 *                   example: "Database connection error"
 */

// Swagger Documentation: Update Fine Record by ID Endpoint

/**
 * @swagger
 * /updateFine/{id}:
 *   put:
 *     summary: Update a fine record by ID
 *     description: Updates an existing fine record based on the provided record ID and updated data.
 *     tags:
 *       - Fine Management
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the fine record to update
 *         schema:
 *           type: string
 *           example: 64faacfd8d9f6b001e8f9e72
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               violatorID:
 *                 type: string
 *                 description: Unique identifier for the violator
 *                 example: V12345
 *               violation:
 *                 type: string
 *                 description: The violation details
 *                 example: Speeding
 *               amount:
 *                 type: number
 *                 description: Fine amount
 *                 example: 150
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: The due date for the fine payment
 *                 example: 2024-12-31
 *     responses:
 *       200:
 *         description: Record updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Record updated successfully"
 *                 data:
 *                   type: object
 *                   description: The updated fine record
 *                   properties:
 *                     violatorID:
 *                       type: string
 *                       description: Unique identifier for the violator
 *                       example: V12345
 *                     violation:
 *                       type: string
 *                       description: The violation details
 *                       example: Speeding
 *                     amount:
 *                       type: number
 *                       description: Fine amount
 *                       example: 150
 *                     dueDate:
 *                       type: string
 *                       format: date
 *                       description: The due date for the fine payment
 *                       example: 2024-12-31
 *       404:
 *         description: Record not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Reason for failure
 *                   example: "Record Not Found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Whether the operation was successful
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Reason for failure
 *                   example: "Failed to update the record"
 *                 error:
 *                   type: string
 *                   description: Error details for debugging (optional)
 *                   example: "Validation error"
 */

// Swagger Documentation: for fine(penalty schema)

/**
 * @swagger
 * components:
 *   schemas:
 *     Fine:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The first name of the individual associated with the fine.
 *           example: "John"
 *         lastName:
 *           type: string
 *           description: The last name of the individual associated with the fine.
 *           example: "Doe"
 *         violation:
 *           type: string
 *           description: A description of the violation that led to the fine.
 *           example: "Parking in a restricted area"
 *         amount:
 *           type: number
 *           format: float
 *           description: The fine amount imposed for the violation.
 *           example: 150.00
 *         dueDate:
 *           type: string
 *           format: date
 *           description: The due date for the fine payment.
 *           example: "2024-12-31"
 *       required:
 *         - firstName
 *         - lastName
 *         - violation
 *         - amount
 *         - dueDate
 *       description: This schema represents the details of a fine imposed on an individual for a violation.
 */

/**
 * @swagger
 * properties:
 *   firstName:
 *     type: string
 *     description: The first name of the individual associated with the fine.
 *     example: "John"
 */

/**
 * @swagger
 * properties:
 *   lastName:
 *     type: string
 *     description: The last name of the individual associated with the fine.
 *     example: "Doe"
 */

/**
 * @swagger
 * properties:
 *   violation:
 *     type: string
 *     description: A description of the violation that led to the fine.
 *     example: "Parking in a restricted area"
 */

/**
 * @swagger
 * properties:
 *   amount:
 *     type: number
 *     format: float
 *     description: The fine amount imposed for the violation.
 *     example: 150.00
 */

/**
 * @swagger
 * properties:
 *   dueDate:
 *     type: string
 *     format: date
 *     description: The due date for the fine payment.
 *     example: "2024-12-31"
 */

// Swagger Documentation: Add Violator Endpoint

/**
 * @swagger
 * /addViolator:
 *   post:
 *     tags:
 *       - Violators
 *     summary: Add violator details
 *     description: This endpoint allows you to add a new violator's details, including their personal information and complete address. All required fields must be provided for successful creation.
 *     operationId: addViolator
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               violatorID:
 *                 type: string
 *                 description: Unique ID for the violator. Must be unique and required.
 *                 example: "V12345"
 *               firstName:
 *                 type: string
 *                 description: First name of the violator.
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: Last name of the violator.
 *                 example: "Doe"
 *               DoB:
 *                 type: string
 *                 format: date
 *                 description: Date of birth of the violator in YYYY-MM-DD format.
 *                 example: "1990-05-15"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the violator.
 *                 example: "john.doe@example.com"
 *               contactNumber:
 *                 type: string
 *                 description: Contact number of the violator.
 *                 example: "+1234567890"
 *               address:
 *                 type: object
 *                 description: Complete address of the violator.
 *                 properties:
 *                   street:
 *                     type: string
 *                     description: Street address of the violator.
 *                     example: "123 Main Street"
 *                   apartment:
 *                     type: string
 *                     description: Apartment number, if applicable.
 *                     example: "Apt 4B"
 *                   city:
 *                     type: string
 *                     description: City or town of the violator's address.
 *                     example: "Springfield"
 *                   state:
 *                     type: string
 *                     description: State of the violator's address.
 *                     example: "IL"
 *                   zipCode:
 *                     type: string
 *                     description: ZIP code of the violator's address.
 *                     example: "62704"
 *     responses:
 *       201:
 *         description: Violator successfully added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Violator added successfully"
 *                 violator:
 *                   type: object
 *                   properties:
 *                     violatorID:
 *                       type: string
 *                       example: "V12345"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     DoB:
 *                       type: string
 *                       format: date
 *                       example: "1990-05-15"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "john.doe@example.com"
 *                     contactNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                           example: "123 Main Street"
 *                         apartment:
 *                           type: string
 *                           example: "Apt 4B"
 *                         city:
 *                           type: string
 *                           example: "Springfield"
 *                         state:
 *                           type: string
 *                           example: "IL"
 *                         zipCode:
 *                           type: string
 *                           example: "62704"
 *       400:
 *         description: Invalid input parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid violator ID"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error adding violator"
 *                 error:
 *                   type: string
 *                   description: Detailed error message for debugging.
 *                   example: "Database connection failed"
 */

// Swagger Documentation: get Violator By Id Endpoint

/**
 * @swagger
 * /getViolator/{id}:
 *   get:
 *     summary: Retrieve a violator's details by ID
 *     description: Fetch details of a violator using their unique ID from the database.
 *     tags:
 *       - Violators
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier (ID) of the violator.
 *         schema:
 *           type: string
 *           example: "63e68b24f4d5e8a5c09a12b3"
 *     responses:
 *       200:
 *         description: Successfully retrieved the violator details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     violatorID:
 *                       type: string
 *                       example: "12345"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     DoB:
 *                       type: string
 *                       format: date
 *                       example: "1985-06-15"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     contactNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                           example: "123 Main Street"
 *                         apartment:
 *                           type: string
 *                           example: "Apt 4B"
 *                         city:
 *                           type: string
 *                           example: "Anytown"
 *                         state:
 *                           type: string
 *                           example: "Anystate"
 *                         zipCode:
 *                           type: string
 *                           example: "12345"
 *       404:
 *         description: Violator not found.
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
 *                   example: "Violator not found"
 *       500:
 *         description: Internal server error while fetching the violator details.
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
 *                   example: "Error fetching violator details"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */

// Swagger Documentation: Delete Violator Endpoint

/**
 * @swagger
 * /deleteViolator/{id}:
 *   delete:
 *     summary: Delete a violator by ID
 *     description: This endpoint allows the deletion of a violator's details from the database by their unique ID.
 *     tags:
 *       - Violators
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the violator to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The violator was successfully deleted
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
 *                   example: "Violator deleted successfully"
 *       404:
 *         description: The violator was not found in the database
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
 *                   example: "Violator not found"
 *       500:
 *         description: Server error - failure to delete violator
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
 *                   example: "Error deleting violator"
 */

// Swagger Documentation: Update Violator Endpoint

/**
 * @swagger
 * /updateViolator/{id}:
 *   put:
 *     summary: Update a violator's details
 *     description: This endpoint allows you to update the details of an existing violator using their MongoDB ObjectId.
 *     tags:
 *       - Violators
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique MongoDB ObjectId of the violator to update
 *         required: true
 *         schema:
 *           type: string
 *           format: objectid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               violatorID:
 *                 type: string
 *                 description: Unique identifier for the violator.
 *                 example: "V123456"
 *               firstName:
 *                 type: string
 *                 description: First name of the violator.
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 description: Last name of the violator.
 *                 example: "Doe"
 *               DoB:
 *                 type: string
 *                 format: date
 *                 description: Date of birth of the violator.
 *                 example: "1985-07-15"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the violator.
 *                 example: "john.doe@example.com"
 *               contactNumber:
 *                 type: string
 *                 description: Contact number of the violator.
 *                 example: "+1234567890"
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                     description: Street address of the violator.
 *                     example: "123 Main St"
 *                   apartment:
 *                     type: string
 *                     description: Apartment number (optional).
 *                     example: "Apt 4B"
 *                   city:
 *                     type: string
 *                     description: City of the violator.
 *                     example: "Los Angeles"
 *                   state:
 *                     type: string
 *                     description: State of the violator.
 *                     example: "CA"
 *                   zipCode:
 *                     type: string
 *                     description: Zip code of the violator.
 *                     example: "90001"
 *             required:
 *               - violatorID
 *               - firstName
 *               - lastName
 *               - DoB
 *               - email
 *               - contactNumber
 *               - address
 *     responses:
 *       200:
 *         description: Violator updated successfully.
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
 *                   example: "Violator updated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     violatorID:
 *                       type: string
 *                       example: "V123456"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     DoB:
 *                       type: string
 *                       format: date
 *                       example: "1985-07-15"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     contactNumber:
 *                       type: string
 *                       example: "+1234567890"
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                           example: "123 Main St"
 *                         apartment:
 *                           type: string
 *                           example: "Apt 4B"
 *                         city:
 *                           type: string
 *                           example: "Los Angeles"
 *                         state:
 *                           type: string
 *                           example: "CA"
 *                         zipCode:
 *                           type: string
 *                           example: "90001"
 *       400:
 *         description: Invalid ObjectId format.
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
 *                   example: "Invalid ObjectId format."
 *       404:
 *         description: Violator not found.
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
 *                   example: "Violator not found."
 *       500:
 *         description: Internal server error.
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
 *                   example: "An error occurred while updating the violator."
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */

// Swagger Documentation: retrieve all fines for a specific violator

/**
 * @swagger
 * /fines/{violatorID}:
 *   get:
 *     summary: Retrieve all fines associated with a specific violator
 *     description: Fetches all fines for a given violator by their unique `violatorID`. If the violator does not exist or has no fines, appropriate messages are returned.
 *     tags:
 *       - Violators
 *     parameters:
 *       - in: path
 *         name: violatorID
 *         required: true
 *         description: The unique identifier for the violator whose fines need to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved fines for the violator
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the success of the operation
 *                 violatorID:
 *                   type: string
 *                   description: The unique identifier of the violator
 *                 fines:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       violator:
 *                         type: string
 *                         description: The ObjectId of the violator associated with the fine
 *                       violation:
 *                         type: string
 *                         description: The violation committed by the violator
 *                       amount:
 *                         type: number
 *                         description: The monetary amount of the fine
 *                       dueDate:
 *                         type: string
 *                         format: date
 *                         description: The due date for the fine
 *                       fineCreatedDate:
 *                         type: string
 *                         format: date
 *                         description: The date when the fine was created
 *       404:
 *         description: Violator not found in the database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the operation
 *                 message:
 *                   type: string
 *                   description: Error message explaining the issue
 *       500:
 *         description: Internal server error occurred while retrieving fines
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates the failure of the operation
 *                 message:
 *                   type: string
 *                   description: Error message explaining the issue
 *                 error:
 *                   type: string
 *                   description: Detailed error message for debugging
 */

// Swagger Documentation: Violator Schema

/**
 * @swagger
 * components:
 *   schemas:
 *     Violator:
 *       type: object
 *       required:
 *         - violatorID
 *         - name
 *         - DoB
 *         - email
 *         - contactNumber
 *         - address
 *       properties:
 *         violatorID:
 *           type: string
 *           description: A unique identifier for the violator. This field is required and must be unique in the database.
 *         name:
 *           type: string
 *           description: The name of the violator. This field is required.
 *         DoB:
 *           type: string
 *           format: date
 *           description: The date of birth of the violator. This field is required.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the violator. This field is required.
 *         contactNumber:
 *           type: string
 *           description: The contact number of the violator. This field is required.
 *         address:
 *           type: object
 *           required:
 *             - street
 *             - city
 *             - state
 *             - zipCode
 *           properties:
 *             street:
 *               type: string
 *               description: The street address of the violator. This field is required.
 *             apartment:
 *               type: string
 *               description: The apartment number or unit of the violator. This field is optional.
 *             city:
 *               type: string
 *               description: The city or town where the violator resides. This field is required.
 *             state:
 *               type: string
 *               description: The state where the violator resides. This field is required.
 *             zipCode:
 *               type: string
 *               description: The ZIP code of the violator's address. This field is required.
 */

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


//Swagger documentation for uploading supporting document to a fine

/**
 * @swagger
 * /fines/{fineId}/documents:
 *   post:
 *     summary: Upload a supporting document for a specific fine.
 *     description: This endpoint allows you to upload a document and associate it with a specific fine using the fine's unique ID. The file metadata will be stored in the database.
 *     tags:
 *       - Supporting Documents
 *     parameters:
 *       - in: path
 *         name: fineId
 *         required: true
 *         description: The unique ID of the fine to which the document will be associated.
 *         schema:
 *           type: string
 *           example: "64b3f7f8e8b23c3abc123456"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: The file to be uploaded. Supported types are .docx, .pdf, .jpg, and .png.
 *             required:
 *               - document
 *     responses:
 *       201:
 *         description: Document uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Document uploaded successfully."
 *                 document:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique ID of the uploaded document.
 *                       example: "64b3f8e8e8b23c3abc123457"
 *                     fineId:
 *                       type: string
 *                       description: The ID of the fine the document is associated with.
 *                       example: "64b3f7f8e8b23c3abc123456"
 *                     fileName:
 *                       type: string
 *                       description: The name of the uploaded file.
 *                       example: "example.pdf"
 *                     fileType:
 *                       type: string
 *                       description: The MIME type of the uploaded file.
 *                       example: "application/pdf"
 *                     fileSize:
 *                       type: number
 *                       description: The size of the file in bytes.
 *                       example: 102400
 *                     filePath:
 *                       type: string
 *                       description: The path where the file is stored.
 *                       example: "supporting_documents/example-64b3f8e8e8b23c3abc123457.pdf"
 *                     uploadTimestamp:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the document was uploaded.
 *                       example: "2023-12-24T10:30:00.000Z"
 *       400:
 *         description: Bad Request. File not uploaded or validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No file uploaded."
 *       500:
 *         description: Internal Server Error. An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */


//Swagger documentation to delete supporting document to a fine

/**
 * @swagger
 * /fines/{fineId}/documents/{documentId}:
 *   delete:
 *     summary: Delete a supporting document associated with a specific fine.
 *     description: Removes the document file from the storage directory and deletes the metadata from the database.
 *     tags:
 *       - Supporting Documents
 *     parameters:
 *       - in: path
 *         name: fineId
 *         required: true
 *         description: The unique ID of the fine associated with the document.
 *         schema:
 *           type: string
 *           example: "64b3f7f8e8b23c3abc123456"
 *       - in: path
 *         name: documentId
 *         required: true
 *         description: The unique ID of the document to delete.
 *         schema:
 *           type: string
 *           example: "64b3f8e8e8b23c3abc123457"
 *     responses:
 *       200:
 *         description: Document deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Document deleted successfully."
 *       404:
 *         description: Document not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Document not found."
 *       500:
 *         description: Internal Server Error. An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */

//Swagger documentation to update existing supporting document to a fine

/**
 * @swagger
 * /fines/{fineId}/documents/{documentId}:
 *   put:
 *     summary: Update a supporting document associated with a fine.
 *     description: Replace the file or update metadata of a document associated with a specific fine.
 *     tags:
 *       - Supporting Documents
 *     parameters:
 *       - in: path
 *         name: fineId
 *         required: true
 *         description: The unique ID of the fine associated with the document.
 *         schema:
 *           type: string
 *           example: "64b3f7f8e8b23c3abc123456"
 *       - in: path
 *         name: documentId
 *         required: true
 *         description: The unique ID of the document to be updated.
 *         schema:
 *           type: string
 *           example: "64b3f8e8e8b23c3abc123457"
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: The new file to replace the existing document. Supported types are .docx, .pdf, .jpg, and .png.
 *               fileName:
 *                 type: string
 *                 description: (Optional) The new name of the document.
 *             required:
 *               - document
 *     responses:
 *       200:
 *         description: Document updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Document updated successfully."
 *                 document:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique ID of the updated document.
 *                       example: "64b3f8e8e8b23c3abc123457"
 *                     fineId:
 *                       type: string
 *                       description: The ID of the fine the document is associated with.
 *                       example: "64b3f7f8e8b23c3abc123456"
 *                     fileName:
 *                       type: string
 *                       description: The name of the uploaded file.
 *                       example: "new-document.pdf"
 *                     fileType:
 *                       type: string
 *                       description: The MIME type of the uploaded file.
 *                       example: "application/pdf"
 *                     fileSize:
 *                       type: number
 *                       description: The size of the file in bytes.
 *                       example: 204800
 *                     filePath:
 *                       type: string
 *                       description: The path where the file is stored.
 *                       example: "supporting_documents/new-document-1678901234.pdf"
 *                     uploadTimestamp:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the document was last updated.
 *                       example: "2024-12-24T14:00:00.000Z"
 *       404:
 *         description: Document not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Document not found."
 *       500:
 *         description: Internal Server Error. An unexpected error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */
