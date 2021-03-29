const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/loginController");

router.get("/", (req, res, next) => {

  res.render("login");
});

router.post("/", loginUser);

module.exports = router;
