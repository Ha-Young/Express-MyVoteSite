const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", {
    user: { email: res.locals.userEmail || "Guest" }
  });
});

module.exports = router;
