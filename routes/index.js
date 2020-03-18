var express = require("express");
var router = express.Router();
const userController = require("./controller/userController");

const renderProperty = {
  title: "전국민 투표앱! 코리아 투표앱",
  formStyle: "form",
  voteFormStyle: "voteForm"
};
const votes = [
  { id: 1, title: "투표제목1", creator: "사용자1", due: "2020-03-20 3pm", state: "진행중" },
  { id: 2, title: "투표제목2", creator: "사용자2", due: "2020-03-20 3pm", state: "진행중" },
  { id: 3, title: "투표제목3", creator: "사용자3", due: "2020-03-20 3pm", state: "완료" }
];

/* GET home page. */
router.get("/", (req, res, next) => {
  const loginUser = req.session.userId;

  console.log(req.session, req.session.userId);
  res.render("index", { title: renderProperty.title, loginUser: loginUser, votes: votes });
});

router.get("/login", (req, res, next) => {
  res.render("login", { title: renderProperty.title, style: renderProperty.formStyle });
});

router.post("/login", (req, res, next) => userController.findUser(req, res, next));

router.get("/signout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});
router.post("/signup", (req, res, next) => userController.findOrCreateUser(req, res, next));

router.get("/signup", (req, res, next) => {
  res.render("signup", { title: renderProperty.title, style: renderProperty.formStyle });
});
router.get("/my-votings", (req, res, next) => {
  const loginUser = req.session.userId;
  if (!loginUser) {
    res.status(401).render("error");
    return;
  }
  res.render("voteForm", {
    title: renderProperty.title,
    loginUser: loginUser,
    style: renderProperty.voteFormStyle
  });
});
router.get("/votings/new", (req, res, next) => {
  const loginUser = req.session.userId;
  //TODO: comment 해제
  // if (!loginUser) {
  //   next({status:401 , message:'로그인후 이용가능합니다'})
  // }
  res.render("voteForm", {
    title: renderProperty.title,
    loginUser: loginUser,
    style: renderProperty.voteFormStyle
  });
});
router.get("/votings/:id", (req, res, next) => {
  const loginUser = req.session.userId;

  res.render("voteForm", {
    title: renderProperty.title,
    loginUser: loginUser,
    style: renderProperty.voteFormStyle
  });
});
module.exports = router;
