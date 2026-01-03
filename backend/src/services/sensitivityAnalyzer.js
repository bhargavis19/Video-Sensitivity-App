const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static").path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

exports.analyzeVideo = (videoPath) => {
  return new Promise((resolve) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) return resolve("flagged");

      const duration = metadata.format.duration || 0;
      const videoStream = metadata.streams.find(s => s.codec_type === "video");
      const width = videoStream?.width || 0;
      const height = videoStream?.height || 0;

      /**
       * RULE-BASED HEURISTICS
       */
      if (
        duration > 600 ||              // > 10 min
        width * height > 1920 * 1080    // > Full HD
      ) {
        resolve("flagged");
      } else {
        resolve("safe");
      }
    });
  });
};
