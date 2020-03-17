var express = require("express");
var router = express.Router();
const userController = require("./controller/userController");
/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "voting-app" });
});

router.get("/login", (req, res, next) => {
  res.render("login", { title: "voting-app", style: "login" });
});

router.post("/login", (req, res, next) => userController.findUser(req, res, next));

router.post("/signup", (req, res, next) => userController.findOrCreateUser(req, res, next));

router.get("/signup", (req, res, next) => {
  res.render("signup", { title: "voting-app", style: "login" });
});

module.exports = router;
