const Video = require('../models/videoModel.js');

const uploadVideo = async (req, res) => {
    const { title, description, videoUrl } = req.body;
    try {
        const video = new Video({
            title,
            description,
            videoUrl,
            uploadedBy: req.user._id
        });

        await video.save();
        res.json({ msg: 'Video uploaded successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { uploadVideo }
