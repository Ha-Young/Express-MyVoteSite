const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");
const Voting = require("../models/voting");

const { confirmUserData, confirmVotingData } = require("./middlewares/validation"); // joi사용하기
const { ErrorHandler } = require("../util/error");

router.get("/", (req, res, next) => {
  res.status(200).render("index", { title: "Express" });
});

router.get("/signup", (req, res, next) => {
  res.status(200).render("signup", { message: "" });
});

router.post("/signup", confirmUserData, async (req, res, next) => {
  try {
    const user = User(req.body);

    await user.validate();
    await user.save();

    res.status(302).redirect("/login");
  } catch (error) {
    next(error);
  }
});

router.get("/login", (req, res, next) => {
  res.status(200).render("login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/login", successRedirect: "/" }));

router.get("/login/github", passport.authenticate("github"));
router.get("/login/github/callback", passport.authenticate("github", {
  failureRedirect: "/login",
  successRedirect: "/",
}));

router.get("/my-votings", (req, res, next) => {

});

router.get("/votings/new", (req, res, next) => {
  res.status(200).render("newVoting");
});

router.post("/votings/new", confirmVotingData, async (req, res, next) => {
  const { body, user } = req;

  try {
    const voting = Voting({
      ...body,
      is_voting: true,
      proponent: user._id,
    });
  
    await voting.save();

    res.status(302).redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
