const express = require("express");
const router = express.Router();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../../models/User");

const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("signup");
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ email }, async function (err, user) {
        if (err) {
          return done(error);
        }

        if (user) {
          return done(null, false, { message: "이미 존재하는 아이디 입니다." });
        }

        const savedUser = await new User({ "email": email, "password": password }).save();
        return done(null, savedUser);
      })
    }
  )
);


router.post(
  "/",
  passport.authenticate("local-signup",
    {
      successRedirect: "/login",
      failureRedirect: "/signup"
    })
);

module.exports = router;
