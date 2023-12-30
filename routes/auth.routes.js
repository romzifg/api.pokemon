const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/user.middleware');

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/logout', authMiddleware, AuthController.logoutUser)

module.exports = router