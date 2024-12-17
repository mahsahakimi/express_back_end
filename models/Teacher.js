const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: String,
  created: Number,
  username: { type: String, unique: true },
  followers: Number,
  followings: Number
});

module.exports = mongoose.model("Teacher", TeacherSchema);
