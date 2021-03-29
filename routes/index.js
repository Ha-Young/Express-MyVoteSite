const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/checkIsAuthenticated");

router.get("/", isAuthenticated, (req, res, next) => {
  res.render("index", { title: "Express" });
});

module.exports = router;
