var express = require("express");
var router = express.Router();
const userController = require("./controller/userController");

const renderProperty = {
  title: "전국민 누구나! 할수있는 투표앱!",
  loginStyle: "login",
  voteFormStyle: "voteForm"
};
/* GET home page. */
router.get("/", (req, res, next) => {
  const loginUser = req.session.displayname;
  console.log(req.session, req.session.displayname);
  res.render("index", { title: renderProperty.title, loginUser: loginUser });
});

router.get("/login", (req, res, next) => {
  res.render("login", { title: renderProperty.title, style: renderProperty.loginStyle });
});

router.post("/login", (req, res, next) => userController.findUser(req, res, next));

router.get("/signout", (req, res, next) => {
 req.session.destroy();
 res.send({ result: 'OK', message: 'Session destroyed' });
});
router.post("/signup", (req, res, next) => userController.findOrCreateUser(req, res, next));

router.get("/signup", (req, res, next) => {
  res.render("signup", { title: renderProperty.title, style: renderProperty.loginStyle });
});

router.get("/newVote", (req, res, next) => {
  res.render("voteForm", { title: renderProperty.title, style: renderProperty.voteFormStyle });
});
module.exports = router;
