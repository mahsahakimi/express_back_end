const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  type: { type: String, enum: ["t", "s"] } // t = teacher, s = student
});

module.exports = mongoose.model("Token", TokenSchema);
