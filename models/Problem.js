const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  title: String,
  content: String,
  option_1: String,
  option_2: String,
  option_3: String,
  option_4: String,
  answer: String,
  difficulty: String,
  category: String,
  author: String,
  solved: { type: Number, default: 0 }
});

module.exports = mongoose.model("Problem", ProblemSchema);
