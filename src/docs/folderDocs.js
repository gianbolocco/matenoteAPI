/**
 * @swagger
 * tags:
 *   name: Folders
 *   description: Folder management for organizing notes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Folder:
 *       type: object
 *       required:
 *         - title
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the folder
 *         title:
 *           type: string
 *           description: The title of the folder
 *         createDate:
 *           type: string
 *           format: date-time
 *           description: The date the folder was created
 *         userId:
 *           type: string
 *           description: The id of the user who owns the folder
 *         notes:
 *           type: array
 *           items:
 *             type: string
 *           description: List of note IDs in the folder
 */

/**
 * @swagger
 * /users/{userId}/folders:
 *   post:
 *     summary: Create a new folder
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: The folder was successfully created
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
 *                     folder:
 *                       $ref: '#/components/schemas/Folder'
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get all folders for a user
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The list of folders
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
 *                     folders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Folder'
 */

/**
 * @swagger
 * /folders/{id}:
 *   get:
 *     summary: Get folder by ID
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The folder ID
 *     responses:
 *       200:
 *         description: The folder description
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
 *                     folder:
 *                       $ref: '#/components/schemas/Folder'
 *       404:
 *         description: Folder not found
 *
 *   patch:
 *     summary: Update a folder
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The folder ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: The folder was updated
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
 *                     folder:
 *                       $ref: '#/components/schemas/Folder'
 *       404:
 *         description: Folder not found
 *
 *   delete:
 *     summary: Delete a folder
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The folder ID
 *     responses:
 *       204:
 *         description: The folder was deleted
 *       404:
 *         description: Folder not found
 */

/**
 * @swagger
 * /folders/{id}/notes:
 *   post:
 *     summary: Add notes to a folder
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The folder ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *             description: Array of note IDs to add
 *     responses:
 *       200:
 *         description: Notes added to folder
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
 *                     folder:
 *                       $ref: '#/components/schemas/Folder'
 *       404:
 *         description: Folder not found
 */

/**
 * @swagger
 * /folders/{id}/notes/{noteId}:
 *   delete:
 *     summary: Remove a note from a folder
 *     tags: [Folders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The folder ID
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: string
 *         required: true
 *         description: The note ID to remove
 *     responses:
 *       200:
 *         description: Note removed from folder
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
 *                     folder:
 *                       $ref: '#/components/schemas/Folder'
 *       404:
 *         description: Folder not found
 */
