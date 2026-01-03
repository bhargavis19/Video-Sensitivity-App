const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organizationId: {
    type: String,
    required: true
  },
  originalName: String,
  filename: String,
  size: Number,
  status: {
    type: String,
    enum: ['uploaded', 'processing', 'safe', 'flagged', "ready"],
    default: 'uploaded'
  },
  progress: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
