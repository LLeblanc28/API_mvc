import express from 'express';
import HomeController from '../controllers/HomeController.js'; 
import UserControllerV1 from '../controllers/UserControllerV1.js';
import TestController from '../controllers/TestController.js';

const router = express.Router();
// NON API
/**
 * @swagger
 * /:
 *   get:
 *     summary: Page d'accueil
 *     description: Retourne la page d'accueil de l'application
 *     tags:
 *       - Home
 *     responses:
 *       200:
 *         description: Page d'accueil affichée avec succès
 */
router.get('/', HomeController.index);

const API_VERSION = process.env.API_VERSION || 'v1';
const API_PREFIX = `/api/${API_VERSION}`;

// API – V1

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     description: Retourne la liste complète de tous les utilisateurs
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(`${API_PREFIX}/users`, UserControllerV1.index);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     description: Retourne les détails d'un utilisateur spécifique
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(`${API_PREFIX}/users/:id`, UserControllerV1.show);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Ajoute un nouvel utilisateur à la base de données
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(`${API_PREFIX}/users`, UserControllerV1.new);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     description: Modifie les informations d'un utilisateur existant
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put(`${API_PREFIX}/users/:id`, UserControllerV1.update);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     description: Supprime un utilisateur de la base de données
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       204:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete(`${API_PREFIX}/users/:id`, UserControllerV1.destroy);


// API – Tests
/**
 * @swagger
 * /api/v1/tests:
 *   get:
 *     summary: Récupérer tous les tests
 *     tags:
 *       - Tests
 *     responses:
 *       200:
 *         description: Liste des tests récupérée avec succès
 */
router.get(`${API_PREFIX}/tests`, TestController.index);
router.get(`${API_PREFIX}/tests/:id`, TestController.show);
router.post(`${API_PREFIX}/tests`, TestController.create);
router.put(`${API_PREFIX}/tests/:id`, TestController.update);
router.delete(`${API_PREFIX}/tests/:id`, TestController.destroy);

export default router;
