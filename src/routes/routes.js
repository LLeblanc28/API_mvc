const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');
const UserControllerV1 = require('../controllers/UserControllerV1');

// NON API
router.get('/', HomeController.index);

// API – V1
router.get('/api/v1/users', UserControllerV1.index);
router.get('/api/v1/users/:id', UserControllerV1.show);
router.post('/api/v1/users', UserControllerV1.new);
router.put('/api/v1/users/:id', UserControllerV1.update);
router.delete('/api/v1/users/:id', UserControllerV1.destroy);

module.exports = router;
