const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  tag: [String],
  date: { type: Date, default: Date.now },
  Author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
});

module.exports = mongoose.model("Questions", questionSchema);
