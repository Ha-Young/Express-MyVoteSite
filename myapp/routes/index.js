const express = require("express");
const router = express.Router();
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const crypto = require("crypto");
const User = require("../models/User");

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
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
    res.send("signup");
  }
});

module.exports = router;
