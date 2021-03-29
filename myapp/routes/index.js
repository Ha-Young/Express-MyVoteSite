const express = require("express");
const router = express.Router();
const LocalStrategy = require("passport-local").Strategy;

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

module.exports = router;
