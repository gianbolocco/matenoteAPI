/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and Session Management
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Initiate Google OAuth login
 *     tags: [Auth]
 *     description: Redirects the user to Google for authentication.
 *     responses:
 *       302:
 *         description: Redirects to Google login page.
 */

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     description: Handles the callback from Google after authentication. Sets the session cookie and redirects to the frontend.
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: The authorization code returned by Google.
 *     responses:
 *       302:
 *         description: Redirects to the frontend application.
 *       401:
 *         description: Authentication failed.
 */

/**
 * @swagger
 * /auth/session:
 *   get:
 *     summary: Get current session user
 *     tags: [Auth]
 *     description: Returns the currently logged-in user based on the session cookie.
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: The logged-in user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized or invalid token.
 */

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     description: Clears the session cookie.
 *     responses:
 *       200:
 *         description: Logged out successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 */
