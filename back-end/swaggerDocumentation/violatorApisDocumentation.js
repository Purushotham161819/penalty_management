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
