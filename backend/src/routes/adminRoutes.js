const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const User = require("../models/User");

// Admin-only: get all users
router.get(
  "/users",
  auth,
  roleMiddleware("admin"),
  async (req, res) => {
    try {
      const users = await User.find().select("-password");

      res.json({
        success: true,
        data: users
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  }
);

module.exports = router;
