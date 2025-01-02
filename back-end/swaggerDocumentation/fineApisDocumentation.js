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
