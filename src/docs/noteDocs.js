/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the note
 *         title:
 *           type: string
 *           description: The title of the note
 *         summary:
 *           type: string
 *           description: The summary of the note
 *         sections:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               subtitle:
 *                 type: string
 *               content:
 *                 type: string
 *               order:
 *                 type: integer
 *               highlights:
 *                  type: array
 *                  items:
 *                      type: string
 *         createDate:
 *           type: string
 *           format: date-time
 *           description: Creation date of the note
 *         source:
 *           type: string
 *           description: Source filename or URL
 *         sourceType:
 *           type: string
 *           description: Type of source (e.g., pdf, youtube)
 *         userId:
 *           type: string
 *           description: ID of the user who created the note
 */

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API for managing notes
 */

/**
 * @swagger
 * /notes/pdf:
 *   post:
 *     summary: Create a new note from PDF
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pdf:
 *                 type: string
 *                 format: binary
 *                 description: PDF file to upload
 *               userId:
 *                 type: string
 *                 description: ID of the user creating the note
 *     responses:
 *       201:
 *         description: The note was successfully created
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
 *                     note:
 *                       $ref: '#/components/schemas/Note'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /notes/youtube:
 *   post:
 *     summary: Create a new note from YouTube Link
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *               - userId
 *             properties:
 *               url:
 *                 type: string
 *                 description: YouTube video URL
 *               userId:
 *                 type: string
 *                 description: ID of the user creating the note
 *     responses:
 *       201:
 *         description: The note was successfully created
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
 *                     note:
 *                       $ref: '#/components/schemas/Note'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 100
 *         description: Number of items per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by User ID
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search by title keyword
 *       - in: query
 *         name: sourceType
 *         schema:
 *           type: string
 *           enum: [pdf, youtube]
 *         description: Filter by source type (pdf, youtube)
 *     responses:
 *       200:
 *         description: List of all notes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     notes:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Note'
 */

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note ID
 *     responses:
 *       200:
 *         description: The note description by ID
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
 *                     note:
 *                       $ref: '#/components/schemas/Note'
 *       404:
 *         description: The note was not found
 *   delete:
 *     summary: Remove the note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The note ID
 *     responses:
 *       204:
 *         description: The note was deleted
 *       404:
 *         description: The note was not found
 */
