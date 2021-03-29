const express = require("express");
const router = express.Router();

const login = require("./auth/login");
const logout = require("./auth/logout");
const signup = require("./auth/signup");

router.get('/', function(req, res, next) {
  res.render("index", { title: "Home" });
});

router.use("/login", login);
router.use("/logout", logout);
router.use("/signup", signup);

module.exports = router;
