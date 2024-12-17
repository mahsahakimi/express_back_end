const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  score: Number,
  username: { type: String, unique: true },
  followers: Number,
  followings: Number,
  solved: [String] // Titles of solved problems
});

module.exports = mongoose.model("Student", StudentSchema);
