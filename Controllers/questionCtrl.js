const Question = require("./Models/Question");
const Answer = require("./Models/Answer");
const User = require("./Models/User");

const questionCtrl = {
  //add a question
  addQuestion: async (req, res) => {
    const email = req.query.email;
    let userId;
    let questionId;
    await User.findOne({ email }, async (err, user) => {
      if (err) console.log(err);
      if (user) {
        userId = user._id;
      }
    });

    const newQuestion = {
      Author: userId,
      body: req.body.body,
      tag: req.body.tag,
      Answer: [],
    };

    await Question.create(newQuestion)
      .then((res) => {
        console.log(res);
        questionId = res._id;
      })
      .catch((err) => console.log(err));

    const updatedUser = await User.update(
      { _id: userId },
      {
        $push: { Questions: questionId },
      }
    );
    console.log(updatedUser);

    res.send("successfully added question");
  },

  //deletes a question
  deleteQuestion: async (req, res) => {
    const qid = req.query.qid;
    const question = await Question.findOne({ _id: qid });

    question.Answers.forEach((answerId) => {
      const answer = await Answer.findOne({ _id: answerId });
      User.update(
        { _id: answer.Author },
        {
          $pull: { Answers: answer._id },
        }
      );
      answer.remove();
    });

    User.update(
      { _id: question.Author },
      {
        $pull: { Questions: qid },
      }
    );
    question.remove();
    res.send("successfully deleted question");
  },
};

module.exports = questionCtrl;
