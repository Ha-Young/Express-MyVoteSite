const express = require("express");
const { getUserName } = require("../util/jwtHelper");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  const user = getUserName(req.cookies);
  res.render('index', { title: "Express", user });
});

module.exports = router;
