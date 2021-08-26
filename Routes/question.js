const router = require("express").Router();
const questionCtrl = require("../controllers/questionCtrl");

router.post("/addquestion", questionCtrl.addQuestion);
router.post("/deletequestion", questionCtrl.deleteQuestion);
router.get("/getquestion", questionCtrl.getQuestion);
router.get("/getquestionbytag", questionCtrl.getQuestionByTag);

module.exports = router;
