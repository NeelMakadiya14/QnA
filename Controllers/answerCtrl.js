const Question = require("./Models/Question");
const Answer = require("./Models/Answer");
const User = require("./Models/User");

const answerCtrl = {
  addAnswer: async (req, res) => {
    const email = req.query.email;
    let userId;
    let questionId = req.query.questionId;
    let answerId;
    await User.findOne({ email }, async (err, user) => {
      if (err) console.log(err);
      if (user) {
        userId = user._id;
      }
    });

    const newAnswer = {
      Author: userId,
      Question: questionId,
      body: req.query.body,
      upvoteCount: { count: 0, upVoters: [] },
      downvoteCount: { count: 0, downVoters: [] },
    };

    await Answer.create(newAnswer)
      .then((res) => {
        console.log(res);
        answerId = res._id;
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

    res.send("Answer Added");
  },

  //deletes a answer
  deleteAnswer: async (req, res) => {
    const aid = req.query.qid;
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
    question.remove();
    res.send("successfully deleted");
  },

  //handle upVote
  upVote: async (req, res) => {
    const upVoted = req.query.upVoted;
    const email = req.query.email;
    const aid = req.query.aid;
    let userId;

    await User.findOne({ email }, async (err, user) => {
      if (err) console.log(err);

      if (user) {
        userId = user._id;

        if (upVoted) {
          await Answer.updateOne(
            { _id: aid },
            { $inc: { upvoteCount: 1 }, $push: { upVoters: userId } }
          );
        } else {
          await Answers.updateOne(
            { _id: aid },
            { $inc: { upvoteCount: -1 }, $pull: { upVoters: userId } }
          );
        }
      }
    });
  },

  //handle downVote
  downVote: async (req, res) => {
    const downVoted = req.query.downVoted;
    const email = req.query.email;
    const aid = req.query.aid;
    let userId;

    await User.findOne({ email }, async (err, user) => {
      if (err) {
        console.log(err);
      }
      if (user) {
        userId = user._id;

        if (downVoted) {
          await Answer.updateOne(
            { _id: aid },
            { $inc: { downvoteCount: 1 }, $push: { downVoters: userId } }
          );
        } else {
          await Answer.updateOne(
            { _id: aid },
            { $inc: { downvoteCount: -1 }, $pull: { downVoters: userId } }
          );
        }
      }
    });
  },
};

module.exports = answerCtrl;
