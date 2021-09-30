const router = require("express").Router();
const answerCtrl = require("../controllers/answerCtrl");

router.post("/addanswer", answerCtrl.addAnswer);
router.post("/deleteanswer", answerCtrl.deleteAnswer);
router.post("/upvote", answerCtrl.upVote);
router.post("/downvote", answerCtrl.downVote);
router.post("/verified", answerCtrl.verified);
router.post("/unverified", answerCtrl.unverified);

module.exports = router;
