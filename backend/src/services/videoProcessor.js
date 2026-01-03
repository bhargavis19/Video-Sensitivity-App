const Video = require('../models/Video');

const processVideo = async (video, io) => {
  // Mark as processing
  video.status = 'processing';
  video.progress = 0;
  await video.save();

  // Simulate progress updates
  const steps = [20, 40, 60, 80];

  for (const step of steps) {
    await new Promise(resolve => setTimeout(resolve, 700));
    video.progress = step;
    await video.save();

    io.emit(`video-progress-${video._id}`, {
      progress: step,
      status: 'processing'
    });
  }

  // 🔥 Sensitivity logic based on file size
  // > 5MB → flagged, else safe
  video.status = "ready";
  video.progress = 100;
  await video.save();

  io.emit(`video-progress-${video._id}`, {
    progress: 100,
    status: video.status
  });
};

module.exports = processVideo;

const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

ffmpeg.setFfmpegPath(ffmpegPath);

exports.prepareForStreaming = (input, output) => {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .outputOptions([
        "-movflags faststart",
        "-preset veryfast",
        "-profile:v main"
      ])
      .size("1280x?")
      .output(output)
      .on("end", resolve)
      .on("error", reject)
      .run();
  });
};
