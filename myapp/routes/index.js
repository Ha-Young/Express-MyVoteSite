const express = require("express");
const router = express.Router();
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const crypto = require("crypto");
const passport = require("passport");
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const cryptoPassword = crypto
        .createHash("sha512")
        .update(password)
        .digest("base64");
      const user = await User.findOne({ email });

      if (!user) {
        console.log("eamil fail");
        return done(null, false, { message: "Incorrect Email" });
      }

      if (user) {
        if (user.password === cryptoPassword) {
          console.log("success");
          return done(null, user);
        } else {
          console.log("password fail");
          return done(null, false, { message: "Incorrect Password" });
        }
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  const user = await User.findOne({ _id: userId });
  return done(null, user);
});

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/login", function (req, res, next) {
  res.render("auth", { isSignUp: false });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

router.get("/signup", function (req, res, next) {
  res.render("auth", { isSignUp: true });
});

router.post("/signup", async function (req, res, next) {
  const { name, email, password } = req.body;
  const doc = await User.findOne({ email: email });

  if (doc) {
    res.send("존재하는 이메일입니다.");
  } else {
    const cryptoPassword = crypto
      .createHash("sha512")
      .update(password)
      .digest("base64");

    await User.create({ name, email, password: cryptoPassword });
    res.status(302).redirect("/");
  }
});

module.exports = router;
