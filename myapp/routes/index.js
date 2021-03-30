const express = require("express");
const createError = require("http-errors");
const crypto = require("crypto");
const passport = require("passport");
const User = require("../models/User");
// const Voting = require("../models/Voting");
const Voting = require("../utils/makeSampleMongoDB").Sample;
const LocalStrategy = require("passport-local").Strategy;

const router = express.Router();

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      const cryptoPassword = crypto
        .createHash("sha512")
        .update(password)
        .digest("base64");

      try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "Incorrect Email" });

        if (user.password === cryptoPassword) {
          return done(null, user, { message: "Login Success" });
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      } catch {
        return done(null, false, { message: "Internal Server Error" });
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({ _id: userId });
    return done(null, user);
  } catch {
    return done(null, false, { message: "Internal Server Error" });
  }
});

router.get("/", async (req, res, next) => {
  const voting = await Voting.find();
  console.log(voting);
  res.render("index");
});

router.get("/login", (req, res, next) => {
  res.render("auth", { isSignUp: false });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    successFlash: true,
    failureFlash: true,
  }),
);

router.get("/signup", (req, res, next) => {
  res.render("auth", { isSignUp: true });
});

router.post("/signup", async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    const doc = await User.findOne({ email: email });

    if (doc) {
      res.send("중복되는 이메일입니다.");
    } else {
      const cryptoPassword = crypto
        .createHash("sha512")
        .update(password)
        .digest("base64");

      await User.create({ name, email, password: cryptoPassword });
      res.status(302).redirect("/login");
    }
  } catch {
    next(createError(500, "Internal Server Error"));
  }
});

module.exports = router;
