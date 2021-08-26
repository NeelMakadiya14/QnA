const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  GID: {
    type: String,
    required: true,
    trim: true,
  },
  Name: String,
  Mnumber: Number,
  Twitter: String,
  City: String,
  State: String,
  Country: String,
  Company: String,
  Clocation: String,
  Bio: String,
  Website: String,
  picUrl: String,
  linkedInUrl: String,
  joined: {
    type: Date,
    default: Date.now,
  },
  Questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Questions" }],
  Answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answers" }],
});

module.exports = mongoose.model("Users", userSchema);
