const express = require("express");
const createError = require("http-errors");
const passport = require("passport");
const User = require("../models/User");
const getLoginStatus = require("../utils/getLoginStatus");
const { createUser } = require("./controllers/user.controller");
require("../utils/localAuthentication");

const router = express.Router();

router.get("/login", (req, res, next) => {
  const isLogin = getLoginStatus(req);
  res.status(200).render("auth", { isLogin, isSignUp: false });
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
  res.status(200).render("auth", { isLogin, isSignUp: true });
});

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const doc = await User.findOne({ email: email });

    if (doc) {
      res.send("중복되는 이메일입니다.");
    } else {
      const userInfo = req.body;
      await createUser(userInfo);
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
