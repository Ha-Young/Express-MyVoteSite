const express = require("express");
const router = express.Router();

const login = require("./auth/login");
const logout = require("./auth/logout");
const signup = require("./auth/signUp");

router.get('/', function(req, res, next) {
  res.render("index", { title: "Home" });
});

router.use("/signup", signup);
router.use("/login", login);
router.use("/logout", logout);


module.exports = router;
