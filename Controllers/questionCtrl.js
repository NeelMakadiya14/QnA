const Question = require("../Models/Question");
const Answer = require("../Models/Answer");
const User = require("../Models/User");

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

    console.log(req.body);

    const newQuestion = {
      Author: userId,
      title: req.body.title,
      body: req.body.body,
      tag: req.body.tags,
      Answer: [],
    };

    console.log(newQuestion);

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

    res.send({ qid: questionId });
  },

  //deletes a question
  deleteQuestion: async (req, res) => {
    const qid = req.query.qid;
    const question = await Question.findOne({ _id: qid });

    question.Answers.forEach(async (answerId) => {
      const answer = await Answer.findOne({ _id: answerId });
      await User.updateOne(
        { _id: answer.Author },
        {
          $pull: { Answers: answer._id },
        }
      );
      answer.remove();
    });

    await User.updateOne(
      { _id: question.Author },
      {
        $pull: { Questions: qid },
      }
    );
    question.remove();
    res.send("successfully deleted question");
  },

  //get the question for given tag
  getQuestionByTag: async (req, res) => {
    const tag = req.query.tag;
    console.log("tag : ", tag);
    if (tag !== "undefined") {
      console.log("first");
      const questions = await Question.find({ tag: { $in: [tag] } });

      console.log(questions);
      res.send(questions);
    } else {
      console.log("second");
      const questions = await Question.find({});

      console.log(questions);
      res.send(questions);
    }
  },

  //get the question for given qid
  getQuestion: async (req, res) => {
    const qid = req.query.qid;
    Question.findOne({ _id: qid })
      .populate("Author")
      .populate("Answers")
      .exec((err, question) => {
        if (err) console.log(err);
        // let detailedAnswer = question.Answers.map((answer) => {
        //   User.findOne({ _id: answer.Author }).then((user) => {
        //     let updated = answer;
        //     console.log("Given : " + updated);
        //     updated["Author"] = {
        //       _id: user._id,
        //       Name: user.Name,
        //       email: user.email,
        //     };
        //     console.log("updated : " + updated);
        //     return updated;
        //   });
        // });
        // question["Answers"] = detailedAnswer;
        // console.log(question);
        res.send(question);
      });
  },
};

module.exports = questionCtrl;
