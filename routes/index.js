const express = require("express");
const router = express.Router();

const authenticateUser = require("./middlewares/autheticate");

router.get("/", authenticateUser, function(req, res, next) {
  res.render("index");
});

module.exports = router;
