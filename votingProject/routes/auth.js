const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares/authorization");
const User = require("../models/User");

router.post("/register", async (req, res, next) => {
  const { email, name, password, passwordRepeat } = req.body;
  try {
    const exUser = await User.findOne({ email });
    if (exUser) {
      req.flash("registerError", "이미 가입된 이메일입니다.");
      return res.redirect("/register");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await User.create({
      email,
      name,
      password: hash
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash("loginError", info.message);
      return res.redirect("/login");
    }
    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
