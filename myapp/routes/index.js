const express = require("express");
const createError = require("http-errors");
const crypto = require("crypto");
const passport = require("passport");
const User = require("../models/User");
require("../utils/localAuthentication");
// const Voting = require("../models/Voting");
const Voting = require("../utils/makeSampleMongoDB").Sample;

const router = express.Router();

router.get("/", async (req, res, next) => {
  const voting = await Voting.find();
  // console.log(voting);
  console.log(req.flash());
  res.render("index", { voting });
});

router.get("/login", (req, res, next) => {
  console.log(req.flash());
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

router.post("/signup", async (req, res, next) => {
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
