/**
 * @swagger
 * components:
 *   schemas:
 *     Quiz:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the quiz
 *         noteId:
 *           type: string
 *           description: The ID of the note this quiz belongs to
 *         quantity:
 *           type: integer
 *           description: Number of questions requested
 *         difficulty:
 *           type: integer
 *           description: Difficulty level (1-3)
 *         questions:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               hint:
 *                 type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     correct:
 *                       type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: API for managing quizzes
 */

/**
 * @swagger
 * /quizzes:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quizzes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - noteId
 *               - quantity
 *               - difficulty
 *             properties:
 *               noteId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               difficulty:
 *                 type: integer
 *     responses:
 *       201:
 *         description: The quiz was successfully created
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
 *                     quiz:
 *                       $ref: '#/components/schemas/Quiz'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /quizzes/note/{noteId}:
 *   get:
 *     summary: Get quizzes by Note ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: string
 *         required: true
 *         description: The Note ID
 *     responses:
 *       200:
 *         description: List of quizzes for the note
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
 *                     quizzes:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Quiz'
 */

/**
 * @swagger
 * /quizzes/{id}:
 *   get:
 *     summary: Get a quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Quiz ID
 *     responses:
 *       200:
 *         description: The quiz description by ID
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
 *                     quiz:
 *                       $ref: '#/components/schemas/Quiz'
 *       404:
 *         description: The quiz was not found
 *   delete:
 *     summary: Remove the quiz by ID
 *     tags: [Quizzes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Quiz ID
 *     responses:
 *       204:
 *         description: The quiz was deleted
 *       404:
 *         description: The quiz was not found
 */
