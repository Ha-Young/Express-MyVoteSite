const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  req.logOut();
  req.session.destroy(function (err) {
    res.redirect("/");
  });
});

module.exports = router;