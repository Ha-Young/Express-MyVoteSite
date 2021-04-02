const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const createError = require("http-errors");

const User = require("../../models/User");

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  const user = User.findById(id);

  done(null, user);
});

passport.use("local-login", new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password"
  },
  async function (email, password, done) {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return done(null, false, { message: "아이디가 존재하지 않습니다." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "비밀번호가 틀렸습니다" });
      }

    } catch (error) {
      return done(error);
    }
  }
));

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res, next) => {
  passport.authenticate("local-login",
    function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (info) {
        return next(createError(401, info.message));
      }

      return req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }

        next();
      });

    })(req, res, next);
}, function (req, res, next) {
  if (req.session.returnTo) {
    res.redirect(req.session.returnTo);
  } else {
    res.redirect("/");
  }
});

module.exports = router;
