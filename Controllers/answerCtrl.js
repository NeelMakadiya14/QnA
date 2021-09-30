const Question = require("../Models/Question");
const Answer = require("../Models/Answer");
const User = require("../Models/User");

const answerCtrl = {
  addAnswer: async (req, res) => {
    const email = req.query.email;

    let questionId = req.query.questionId;
    let answerId;
    const user = await User.findOne({ email });
    let userId = user._id;
    console.log(userId);
    const newAnswer = {
      Author: userId,
      Question: questionId,
      body: req.body.body,
      upvote: { count: 0, upVoters: [] },
      downvote: { count: 0, downVoters: [] },
    };
    console.log(newAnswer);

    let answer;
    await Answer.create(newAnswer)
      .then((res) => {
        console.log(res);
        answerId = res._id;
        answer = res;
      })
      .catch((err) => console.log(err));

    const updatedUser = await User.update(
      { _id: userId },
      {
        $push: { Answers: answerId },
      }
    );
    console.log(updatedUser);

    const updatedQuestion = await Question.update(
      { _id: questionId },
      {
        $push: { Answers: answerId },
      }
    );
    console.log(updatedQuestion);

    res.send(answer);
  },

  //deletes a answer
  deleteAnswer: async (req, res) => {
    const aid = req.query.aid;
    const answer = await Answer.findOne({ _id: aid });

    await Question.update(
      { _id: answer.Question },
      {
        $pull: { Answers: aid },
      }
    );

    await User.update(
      { _id: answer.Author },
      {
        $pull: { Answers: aid },
      }
    );
    answer.remove();
    res.send("successfully deleted");
  },
  //
  //handle upVote
  upVote: async (req, res) => {
    console.log("upvote");
    const upVoted = req.query.upVoted;
    const email = req.query.email;
    const aid = req.query.aid;
    let userId;
    console.log(upVoted, " : ", aid);
    await User.findOne({ email }, async (err, user) => {
      if (err) console.log(err);
      //   console.log(user);
      if (user) {
        userId = user._id;

        if (upVoted === "1") {
          console.log(userId);
          await Answer.update(
            { _id: aid },
            {
              $push: { "upvote.upVoters": userId },
              $inc: { "upvote.count": 1 },
            }
          ).then((res) => {
            // console.log(res);
          });
        } else {
          await Answer.updateOne(
            { _id: aid },
            {
              $inc: { "upvote.count": -1 },
              $pull: { "upvote.upVoters": userId },
            }
          ).then((res) => {
            // console.log(res);
          });
        }

        res.send("upvoted");
      }
    });
  },

  //handle downVote
  downVote: async (req, res) => {
    const downVoted = req.query.downVoted;
    const email = req.query.email;
    const aid = req.query.aid;
    let userId;
    console.log("downvote : " + downVoted);
    await User.findOne({ email }, async (err, user) => {
      if (err) {
        console.log(err);
      }
      if (user) {
        userId = user._id;

        if (downVoted === "1") {
          await Answer.updateOne(
            { _id: aid },
            {
              $inc: { "downvote.count": 1 },
              $push: { "downvote.downVoters": userId },
            }
          );
        } else {
          await Answer.updateOne(
            { _id: aid },
            {
              $inc: { "downvote.count": -1 },
              $pull: { "downvote.downVoters": userId },
            }
          );
        }

        res.send("downvoted");
      }
    });
  },

  // verified the answer
  verified: async (req, res) => {
    const aid = req.query.aid;
    await Answer.updateOne(
      { _id: aid },
      {
        $set: { verified: true },
      }
    );
    res.send("verified");
  },

  //unverified the answer
  unverified: async (req, res) => {
    const aid = req.query.aid;
    await Answer.updateOne(
      { _id: aid },
      {
        $set: { verified: false },
      }
    );
    res.send("unverified");
  },
};

module.exports = answerCtrl;
