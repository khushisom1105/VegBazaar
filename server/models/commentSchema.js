const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  replied: {
    type: Boolean,
    default: false,
  },
  reply: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);