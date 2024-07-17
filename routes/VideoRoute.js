// routes/video.js
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/VideoController.js');
const auth = require('../middleware/authMiddleware.js');
const admin = require('../middleware/adminMiddleware.js');

router.post('/upload', auth, admin, videoController.uploadVideo);

module.exports = router;
