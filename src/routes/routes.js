const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');
const UserControllerV1 = require('../controllers/UserControllerV1');

// NON API
router.get('/', HomeController.index);

const API_VERSION = process.env.API_VERSION || 'v1';
const API_PREFIX = `/api/${API_VERSION}`;

// API – V1
router.get(`${API_PREFIX}/users`, UserControllerV1.index);
router.get(`${API_PREFIX}/users/:id`, UserControllerV1.show);
router.post(`${API_PREFIX}/users`, UserControllerV1.new);
router.put(`${API_PREFIX}/users/:id`, UserControllerV1.update);
router.delete(`${API_PREFIX}/users/:id`, UserControllerV1.destroy);

module.exports = router;
