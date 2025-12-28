/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the chat
 *         noteId:
 *           type: string
 *           description: The ID of the note associated with the chat
 *         messages:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [user, assistant]
 *                 description: Sender of the message
 *               content:
 *                 type: string
 *                 description: The message content
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: Time of the message
 *         userId:
 *           type: string
 *           description: The ID of the user associated with the chat
 */

/**
 * @swagger
 * /notes/{id}/chat:
 *   post:
 *     summary: Chat with a note
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The user's message
 *               userId:
 *                 type: string
 *                 description: The ID of the user sending the message
 *     responses:
 *       200:
 *         description: The chat response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     response:
 *                       $ref: '#/components/schemas/Chat'
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get chat history for a note
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note ID
 *     responses:
 *       200:
 *         description: The chat history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     chatHistory:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           role:
 *                             type: string
 *                           content:
 *                             type: string
 *                           timestamp:
 *                             type: string
 *                             format: date-time
 *       404:
 *         description: Note not found or no chat history
 */
