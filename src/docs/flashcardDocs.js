/**
 * @swagger
 * components:
 *   schemas:
 *     Flashcard:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the flashcard set
 *         noteId:
 *           type: string
 *           description: The ID of the note this flashcard set belongs to
 *         quantity:
 *           type: integer
 *           description: Number of flashcards requested
 *         difficulty:
 *           type: integer
 *           description: Difficulty level (1-3)
 *         flashcards:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 */

/**
 * @swagger
 * tags:
 *   name: Flashcards
 *   description: API for managing flashcards
 */

/**
 * @swagger
 * /flashcards:
 *   post:
 *     summary: Create a new flashcard set
 *     tags: [Flashcards]
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
 *         description: The flashcard set was successfully created
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
 *                     flashcard:
 *                       $ref: '#/components/schemas/Flashcard'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /flashcards/{id}:
 *   get:
 *     summary: Get a flashcard set by ID
 *     tags: [Flashcards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Flashcard Set ID
 *     responses:
 *       200:
 *         description: The flashcard set description by ID
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
 *                     flashcard:
 *                       $ref: '#/components/schemas/Flashcard'
 *       404:
 *         description: The flashcard set was not found
 *   delete:
 *     summary: Remove the flashcard set by ID
 *     tags: [Flashcards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Flashcard Set ID
 *     responses:
 *       204:
 *         description: The flashcard set was deleted
 *       404:
 *         description: The flashcard set was not found
 */
