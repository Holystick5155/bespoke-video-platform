// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController.js');
const auth = require('../middleware/authMiddleware.js');

router.post('/signup', authController.signup);
router.get('/verify/:token', authController.verify);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router;
