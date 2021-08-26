//importing Models
const User = require("../Models/User");

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
  addUser: async (req, res) => {
    const newData = req.body;
    console.log("Data Arrived..");

    await User.find({ email: req.body.email }, async (err, user) => {
      console.log("User Length : " + user.length);
      if (user.length > 0) {
        await User.updateOne(
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
        await User.create(newData)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      }
      console.log("Data Added..");
      res.send("success");
    });
  },
};

module.exports = userCtrl;
