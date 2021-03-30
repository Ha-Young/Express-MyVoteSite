const express = require("express");
const router = express.Router();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../../models/User");

const bcrypt = require("bcrypt");

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(function (id, done) {
  const user = User.findOne({ email: id });

  done(null, user);
});

passport.use("local-login", new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  function (email, password, done) {
    User.findOne({ email: email }, async function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: "아이디가 존재하지 않습니다." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "비밀번호가 틀렸습니다" });
      }
    })
  }
));

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/",
  passport.authenticate("local-login",
    {
      successRedirect: "/",
      failureRedirect: "/login"
    })
);

module.exports = router;
