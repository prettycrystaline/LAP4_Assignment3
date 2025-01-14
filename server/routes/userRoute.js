var express = require('express');
var router = express.Router();

const authController = require('../controllers/authControllers');

router.post('/login', authController.login);
router.post('/signup', authController.createUser);
router.get('/user/:id', authController.readUserData);

module.exports = router;