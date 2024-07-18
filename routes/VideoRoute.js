// routes/video.js
const express = require('express');
const router = express.Router();
const videoController = require('../controllers/VideoController.js');
const auth = require('../middleware/authMiddleware.js');
const admin = require('../middleware/adminMiddleware.js');

router.post('/upload', auth, admin, videoController.uploadVideo);
router.get('/:id', videoController.getVideo);
router.get('/', videoController.getAllVideos);
router.delete('/:id', auth, admin, videoController.deleteVideo);
router.put('/:id', auth, admin, videoController.updateVideo);

module.exports = router;
