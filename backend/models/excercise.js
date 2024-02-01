const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // Add imageUrl field
  },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
