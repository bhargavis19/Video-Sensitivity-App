const Video = require('../models/Video');
const processVideo = require('../services/videoProcessor');
const fs = require('fs');
const path = require('path');

// UPLOAD VIDEO
exports.uploadVideo = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error("No video uploaded");
      err.statusCode = 400;
      throw err;
    }

    const video = await Video.create({
      userId: req.user.id,
      organizationId: req.user.organizationId,
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      status: "processing",
      progress: 0
    });

    const io = req.app.get("io");
    processVideo(video, io);

    res.status(201).json({
      success: true,
      data: video
    });

  } catch (err) {
      next(err);
  }
};

// STREAM VIDEO
exports.streamVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const videoPath = path.join(__dirname, '../../uploads', video.filename);
    const videoSize = fs.statSync(videoPath).size;

    const range = req.headers.range;
    if (!range) {
      return res.status(416).send('Range header required');
    }

    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4'
    });

    fs.createReadStream(videoPath, { start, end }).pipe(res);

  } catch (err) {
      next(err);
  }
};
// LIST USER VIDEOS
exports.getUserVideos = async (req, res, next) => {
  try {
    const { status } = req.query;

    const filter = { 
      userId: req.user.id,
      organizationId: req.user.organizationId
    };

    // Optional filtering by status
    if (status) {
      filter.status = status;
    }

    const videos = await Video.find(filter)
      .sort({ createdAt: -1 });

    res.json({ success: true, data: videos });
  } catch (err) {
      next(err);
  }
};
// DELETE VIDEO
exports.deleteVideo = async (req, res,next) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      userId: req.user.id,
      organizationId: req.user.organizationId
    });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found"
      });
    }

    // delete file from uploads folder
    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(__dirname, "../../uploads", video.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await video.deleteOne();

    res.json({
      success: true,
      message: "Video deleted successfully"
    });
  } catch (err) {
      next(err);
  }
};