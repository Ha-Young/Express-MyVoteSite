const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../model/User");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/signIn", function(req, res, next) {
  const warningMessage = req.cookies["warningMessage"];
  res.clearCookie("warningMessage", { httpOnly: true });
  res.render("signIn", { title: "Express" });
});

router.post("/signIn", passport.authenticate("jwt", { session: false }),
 function(req, res, next) {
  const {
    body: { password },
    user
  } = req;

  if (!user) {
    res.cookie("warningMessage", "pls check your Email", { httpOnly: true });
    return res.redirect("/signIn");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    res.cookie("warningMessage", "pls check your Password", { httpOnly: true });
    return res.redirect("/signIn");
  }

  res.render("signIn", { title: "express" });
});

router.get("/signUp", async function(req, res, next) {
  const warningMessage = req.cookies["warningMessage"];
  res.clearCookie("warningMessage", { httpOnly: true });
  res.render("index", { message: warningMessage });
});

router.post("/signUp", async function(req, res, next) {
  const {
    body: { email, password, password2, name },
  } = req;

  if (password !== password2) {
    res.cookie("warningMessage", "both Password is not same", { httpOnly: true });
    return res.redirect("/signUp");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    email,
    password: hashedPassword,
    name
  };

  res.cookie("jwt", jwt.sign({
      email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
    },
    process.env.JWT_SECRET
  ));

  await User.create(newUser);

  res.redirect("/signin");
});

module.exports = router;
