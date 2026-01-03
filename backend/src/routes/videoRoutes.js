const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const auth = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const {
  uploadVideo,
  streamVideo,
  getUserVideos,
  deleteVideo
} = require("../controllers/videoController");

// 📤 Upload video (editor/admin only)
router.post(
  "/upload",
  auth,
  authorize("editor", "admin"),
  upload.single("video"),
  uploadVideo
);

// 📄 Get all videos of logged-in user
router.get(
  "/",
  auth,
  getUserVideos
);

// 🎥 Stream video (authenticated user)
router.get(
  "/stream/:id",
  auth,
  streamVideo
);

// 🗑️ Delete video (owner only)
router.delete(
  "/:id",
  auth,
  deleteVideo
);

module.exports = router;
