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
 * /{fineId}/{documentId}:
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
 *         description: Document deleted successfully. The document and its metadata have been removed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Document deleted successfully."
 *       404:
 *         description: Document not found. The specified document could not be located for the given fine ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Document not found."
 *       500:
 *         description: Internal Server Error. An error occurred while attempting to delete the document or its metadata.
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
