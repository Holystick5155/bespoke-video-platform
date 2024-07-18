// routes/auth.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController.js');
const auth = require('../middleware/authMiddleware.js');


router.get('/:id', auth, userController.getUser);
router.get('/', auth, userController.getAllUsers);

module.exports = router;
