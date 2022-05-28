const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
  },
  Role: {
    type: String,
  },
  SnakeScores: {
    type: Number,
  },
  SriScores: {
    type: Number,
  },
  png_src: {
    type: String,
  },
});
module.exports = mongoose.model('users', UserSchema);
