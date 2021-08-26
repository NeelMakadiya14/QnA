const router = require("express").Router();
const userCtrl = require("../controllers/userCtrl");

router.post("/addUser", userCtrl.addUser);
router.get("/getUser", userCtrl.getUser);

module.exports = router;
