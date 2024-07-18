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

// Get a video
const getVideo = async (req, res) => {
    const id = req.params.id;

    try {
        const video = await Video.findById(id);
        if (video) {
            res.status(200).json(video);
        } else {
            res.status(404).json("Video not found");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get all videos
const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json(error);
    }
};

// update post
const updateVideo = async (req, res) => {
    const videoId = req.params.id;
    const { title, description, videoUrl } = req.body;
    try {
        const video = await Video.findById(videoId);
        video.description = description;
        video.title = title;
        video.videoUrl = videoUrl;

        await video.save();
        res.status(200).json("Video updated!");
    } catch (error) {
        res.status(403).json("Video not updated");
    }
};




// delete a video
const deleteVideo = async (req, res) => {
    const id = req.params.id;
    try {
        const video = await Video.findById(id);
        if (video._id.toString() === id.toString()) {
            await video.deleteOne();
            res.status(200).json("Video deleted.");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { uploadVideo, getVideo, getAllVideos, updateVideo, deleteVideo }
