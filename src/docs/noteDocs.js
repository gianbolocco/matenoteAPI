/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
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
 *           description: Type of source (e.g., pdf, audio, youtubeLink)
 *         userId:
 *           type: integer
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
 * /notes:
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
 *                 type: integer
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
