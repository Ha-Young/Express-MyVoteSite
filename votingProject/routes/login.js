var express = require("express");
var router = express.Router();
const { isNotLoggedIn } = require("./middlewares/authorization");

router.get("/", isNotLoggedIn, (req, res, next) => {
  res.render("login", { error: req.flash("loginError") });
});

module.exports = router;
