const express = require("express");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authenticateUser = require("./middlewares/authenticateUser");
const passport = require("passport");

router.get("/login", (req, res, next) => {
  res.status(200).render("login");
});

router.post("/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/signup",
    successRedirect: "/"
  }
));

router.get("/logout", authenticateUser, (req, res, next) => {
  req.logout();
  res.status(301).redirect("/");
});

router.get("/signup", (req, res, next) => {
  res.status(200).render("signup");
});

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password: plainPassword } = req.body;
    const password = await bcrypt.hash(plainPassword, 10);
    const user = await User.findOne({ email });

    if (user) {
      res.render("signup", { message: "이미 존재하는 이메일 입니다" });
      return;
    }

    await User.create({
      name,
      email,
      password,
    });

    res.status(200).render("success", { message: "회원가입을 축하합니다" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
