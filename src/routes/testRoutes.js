import express from 'express';
import TestController from '../controllers/TestController.js';

const API_PREFIX = '/api/' + (process.env.API_VERSION || 'v1');

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

/**
 * @swagger
 * /api/v1/tests/{id}:
 *   get:
 *     summary: Récupérer un test
 *     tags:
 *       - Tests
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 */
router.get(`${API_PREFIX}/tests/:id`, TestController.show);

/**
 * @swagger
 * /api/v1/tests:
 *   post:
 *     summary: Créer un nouveau test
 *     tags:
 *       - Tests
 */
router.post(`${API_PREFIX}/tests`, TestController.create);

/**
 * @swagger
 * /api/v1/tests/{id}:
 *   put:
 *     summary: Mettre à jour un test
 *     tags:
 *       - Tests
 */
router.put(`${API_PREFIX}/tests/:id`, TestController.update);

/**
 * @swagger
 * /api/v1/tests/{id}:
 *   delete:
 *     summary: Supprimer un test
 *     tags:
 *       - Tests
 */
router.delete(`${API_PREFIX}/tests/:id`, TestController.destroy);
