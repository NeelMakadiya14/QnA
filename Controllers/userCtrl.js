//importing Models
const Question = require("./Models/Question");
const Answer = require("./Models/Answer");
const User = require("./Models/User");

const userCtrl = {
  //Arrow function to get the user
  getUser: (req, res) => {
    const email = req.query.email;
    User.find({ email })
      .populate("Questions")
      .populate("Answers")
      .exec((err, user) => {
        if (err) {
          console.log(err);
        }
        user.length !== 0 ? res.send(user) : res.send(false);
      });
  },

  //Arrow function to add or update the user
  addUser: (req, res) => {
    const newData = req.body;
    console.log(newAuthor);

    Author.find({ email: req.body.email }, (err, user) => {
      console.log(err);
      if (user.length > 0) {
        Author.updateOne(
          { email: req.body.email },
          {
            $set: {
              ...user,
              ...newData,
            },
          }
        )
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } else {
        User.create(newData)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      res.send("success");
    });
  },
};

module.exports = userCtrl;
