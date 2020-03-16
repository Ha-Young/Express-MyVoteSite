var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "voting-app" });
});

router.get("/login", function(req, res, next) {
  res.render("login", { title: "voting-app", style: "login" });
});

router.get("/signup", function(req, res, next) {
  res.render("signup", { title: "voting-app", style: "login" });
});

module.exports = router;
