const express = require("express");
const router = express.Router();
const { isNotLoggedIn } = require("./middlewares/authorization");

router.get("/", isNotLoggedIn, (req, res, next) => {
  res.render("register", { error: req.flash("registerError") });
});

module.exports = router;
