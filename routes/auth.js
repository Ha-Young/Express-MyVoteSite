const express = require("express");
const router = express.Router();

router.get("/signup", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post("/signup", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/login", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.post("/login", (req, res, next) => {
  res.render("index", { title: "Express" });
});

module.exports = router;
