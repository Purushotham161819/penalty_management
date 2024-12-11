// Swagger Documentation: Add Fine Record Endpoint

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Add a fine
 *     description: Add details about a fine, including the violator's name, violation type, fine amount, and due date.
 *     tags:
 *       - Fine Management
 *     requestBody:
 *       description: Fine details to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the violator
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Last name of the violator
 *                 example: Doe
 *               violation:
 *                 type: string
 *                 description: Type of violation committed
 *                 example: Speeding
 *               amount:
 *                 type: number
 *                 description: Amount of fine
 *                 example: 150
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Due date for the fine payment
 *                 example: 2024-12-31
 *     responses:
 *       201:
 *         description: Fine added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Fine added successfully!
 *       400:
 *         description: Validation error in the request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid first name. Only alphabets and single spaces are allowed.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while adding the fine.
 */


// Swagger Documentation: Delete Fine Record Endpoint

/**
 * @swagger
 * /delete/{id}:
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
 * /getRecord/{id}:
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
 *                     firstName:
 *                       type: string
 *                       description: First name of the person
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       description: Last name of the person
 *                       example: Doe
 *                     violation:
 *                       type: string
 *                       description: The violation details
 *                       example: Speeding
 *                     amount:
 *                       type: number
 *                       description: Fine amount
 *                       example: 150.00
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
 *                   example: Error fetching the record.
 */


// Swagger Documentation: Update Fine Record by ID Endpoint


/**
 * @swagger
 * /updateRecord/{id}:
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
 *               firstName:
 *                 type: string
 *                 description: First name of the person (optional)
 *                 example: John
 *               lastName:
 *                 type: string
 *                 description: Last name of the person (optional)
 *                 example: Doe
 *               violation:
 *                 type: string
 *                 description: The violation details (optional)
 *                 example: Speeding
 *               amount:
 *                 type: number
 *                 description: Fine amount (optional)
 *                 example: 150.00
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: The due date for the fine payment (optional)
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
 *                   example: Record updated successfully
 *                 data:
 *                   type: object
 *                   description: The updated fine record
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       description: First name of the person
 *                       example: John
 *                     lastName:
 *                       type: string
 *                       description: Last name of the person
 *                       example: Doe
 *                     violation:
 *                       type: string
 *                       description: The violation details
 *                       example: Speeding
 *                     amount:
 *                       type: number
 *                       description: Fine amount
 *                       example: 150.00
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
 *                   example: Record Not Found
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
 *                   example: Failed to update the record
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
 *     summary: Add a new violator to the database
 *     description: This endpoint allows the creation of a new violator by submitting their details. All fields are validated to ensure data integrity before saving to the database.
 *     tags:
 *       - Violators
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               violatorID:
 *                 type: string
 *                 description: A unique alphanumeric identifier for the violator.
 *                 example: "V12345"
 *               name:
 *                 type: string
 *                 description: Full name of the violator.
 *                 example: "John Doe"
 *               DoB:
 *                 type: string
 *                 format: date
 *                 description: The violator's date of birth in YYYY-MM-DD format.
 *                 example: "1990-05-14"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The violator's email address.
 *                 example: "john.doe@example.com"
 *               contactNumber:
 *                 type: string
 *                 description: The violator's contact number (10 digits).
 *                 example: "9876543210"
 *               address:
 *                 type: object
 *                 description: The violator's address details.
 *                 properties:
 *                   street:
 *                     type: string
 *                     description: Street address.
 *                     example: "123 Main Street"
 *                   apartment:
 *                     type: string
 *                     description: Apartment or suite number.
 *                     example: "Apt 4B"
 *                   city:
 *                     type: string
 *                     description: City name.
 *                     example: "Springfield"
 *                   state:
 *                     type: string
 *                     description: State name.
 *                     example: "Illinois"
 *                   zipCode:
 *                     type: string
 *                     description: ZIP code.
 *                     example: "62704"
 *             required:
 *               - violatorID
 *               - name
 *               - DoB
 *               - email
 *               - contactNumber
 *               - address
 *     responses:
 *       201:
 *         description: Violator details successfully added.
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
 *                       description: The unique ID of the violator.
 *                       example: "V12345"
 *                     name:
 *                       type: string
 *                       description: Full name of the violator.
 *                       example: "John Doe"
 *                     DoB:
 *                       type: string
 *                       format: date
 *                       description: The date of birth of the violator.
 *                       example: "1990-05-14"
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: The violator's email address.
 *                       example: "john.doe@example.com"
 *                     contactNumber:
 *                       type: string
 *                       description: The violator's contact number.
 *                       example: "9876543210"
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
 *                           example: "Illinois"
 *                         zipCode:
 *                           type: string
 *                           example: "62704"
 *       400:
 *         description: Validation error due to invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid violator ID."
 *       500:
 *         description: Server error occurred while saving violator details.
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
 *                   example: "Database connection failure"
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
 *     summary: Update a violator's record by ID
 *     description: This endpoint allows the update of a violator's details in the database using their unique ID. The details are updated with the provided data in the request body.
 *     tags:
 *       - Violators
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the violator whose record is to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               violatorID:
 *                 type: string
 *                 description: The unique identifier of the violator.
 *               name:
 *                 type: string
 *                 description: The name of the violator.
 *               DoB:
 *                 type: string
 *                 format: date
 *                 description: The date of birth of the violator.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the violator.
 *               contactNumber:
 *                 type: string
 *                 description: The contact number of the violator.
 *               address:
 *                 type: string
 *                 description: The address of the violator.
 *     responses:
 *       200:
 *         description: The violator's record was successfully updated.
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
 *                   example: "Violator record updated successfully"
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
 *                       type: string
 *                       example: "123 Main Street, City, Country"
 *       400:
 *         description: Bad Request - The data provided in the request body is invalid.
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
 *                   example: "Invalid data provided for violator"
 *       404:
 *         description: Violator not found - No violator found with the provided ID.
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
 *         description: Server error - Internal server error while updating the violator.
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
 *                   example: "Error updating violator"
 *                 error:
 *                   type: string
 *                   example: "Database connection failure"
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