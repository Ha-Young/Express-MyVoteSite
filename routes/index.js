var express = require("express");
var router = express.Router();
const userController = require("./controller/userController");
const voteController = require("./controller/voteController");
const { RENDER_PROPS } = require("./controller/constant");

router.get("/", (req, res, next) => voteController.getAllVote(req, res, next));

router.get("/login", (req, res, next) => {
  res.render("login", { title: RENDER_PROPS.TITLE, style: RENDER_PROPS.STYLE.FORM });
});

router.post("/login", (req, res, next) => userController.findUser(req, res, next));

router.get("/signout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/");
});

router.post("/signup", (req, res, next) => userController.findOrCreateUser(req, res, next));

router.get("/signup", (req, res, next) => {
  res.render("signup", { title: RENDER_PROPS.TITLE, style: RENDER_PROPS.STYLE.FORM });
});

router.get("/my-votings", (req, res, next) => {
  const loginUser = req.session.userId;
  if (!loginUser) {
    res.status(401).render("error");
    return;
  }
  res.render("voteForm", {
    title: RENDER_PROPS.TITLE,
    loginUser: loginUser,
    style: RENDER_PROPS.STYLE.VOTE_FORM
  });
});

router.get("/votings/new", (req, res, next) => {
  const loginUser = req.session.userId;
  if (!loginUser) {
    next({ status: 401, message: "로그인후 이용가능합니다" });
  }
  res.render("voteForm", {
    title: RENDER_PROPS.TITLE,
    loginUser: loginUser,
    style: RENDER_PROPS.STYLE.VOTE_FORM
  });
});

router.post("/votings/new", (req, res, next) => {
  voteController.createVote(req, res, next);
});

router.get("/votings/:id", (req, res, next) => voteController.getUserVote(req, res, next));

router.post("/votings/:id", (req, res, next) => voteController.updateVoteCount(req, res, next));

module.exports = router;
