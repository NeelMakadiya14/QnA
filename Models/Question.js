const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: String,
  body: {
    type: String,
    required: true,
  },
  tag: [String],
  date: { type: Date, default: Date.now },
  Author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  Answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answers" }],
});

module.exports = mongoose.model("Questions", questionSchema);
