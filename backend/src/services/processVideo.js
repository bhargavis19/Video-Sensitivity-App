const path = require("path");
const { analyzeVideo } = require("./sensitivityAnalyzer");

module.exports = async function processVideo(video, io) {
  const videoPath = path.join("uploads", video.filename);

  for (let p = 10; p <= 90; p += 20) {
    await new Promise(r => setTimeout(r, 400));
    video.progress = p;
    await video.save();
    io.emit(`video-progress-${video._id}`, { progress: p });
  }

  const status = await analyzeVideo(videoPath);
  video.status = status;
  video.progress = 100;
  await video.save();

  io.emit(`video-progress-${video._id}`, {
    progress: 100,
    status
  });
};
const { prepareForStreaming } = require("./videoProcessor");

await prepareForStreaming(
  videoPath,
  path.join("uploads/processed", video.filename)
);

video.status = "ready";

