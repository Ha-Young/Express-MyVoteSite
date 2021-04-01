const express = require("express");
const createError = require("http-errors");
const crypto = require("crypto");
const passport = require("passport");
const User = require("../models/User");
const getLoginStatus = require("../utils/getLoginStatus");
require("../utils/localAuthentication");

const router = express.Router();

router.get("/login", (req, res, next) => {
  const isLogin = getLoginStatus(req);
  res.render("auth", { isLogin, isSignUp: false });
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
  const isLogin = getLoginStatus(req);
  res.render("auth", { isLogin, isSignUp: true });
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
  } catch (err) {
    console.error(`get /signup ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

router.get("/logout", (req, res, next) => {
  req.logout();
  res.status(302).redirect("/");
});

module.exports = router;
