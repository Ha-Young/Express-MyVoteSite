const express = require("express");
const router = express.Router();

router.get("/new", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/new", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/success", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/error", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:id", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/:id", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
