var express = require("express");
var router = express.Router();
const userController = require("./controller/userController");

const renderProperty={title:'누구나 참여할수있는 투표! 보팅앱' , style:'login'}
/* GET home page. */
router.get("/", (req, res, next) => {
  const loginUser =req.session.displayname;
  console.log(req.session,req.session.displayname);
  res.render("index", { title: renderProperty.title, loginUser:renderProperty.style});
});

router.get("/login", (req, res, next) => {
  res.render("login", { title: renderProperty.title, style: renderProperty.style });
});

router.post("/login", (req, res, next) => userController.findUser(req, res, next));

router.post("/signup", (req, res, next) => userController.findOrCreateUser(req, res, next));

router.get("/signup", (req, res, next) => {
  res.render("signup", { title: renderProperty.title, style: renderProperty.style });
});

module.exports = router;
