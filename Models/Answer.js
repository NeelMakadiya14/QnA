const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  upvote: {
    count: Number,
    upVoters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  downvote: {
    count: Number,
    downVoters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  date: { type: Date, default: Date.now },
  Author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  Question: { type: mongoose.Schema.Types.ObjectId, ref: "Answers" },
});

module.exports = mongoose.model("Answers", answerSchema);
