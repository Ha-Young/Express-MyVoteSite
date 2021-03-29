const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../model/User");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", function(req, res, next) {
  res.render("login", { title: "Express" });
});

router.post("/login", passport.authenticate("jwt", { session: false }),
 function(req, res, next) {
  res.render("index", { title: "express" });
});

router.get("/signup", async function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async function(req, res, next) {
  const {
    body: { email, password, name },
  } = req;

  const hashedPassword = bcrypt.hashSync(password[0], 10);
  const newUser = {
    email,
    password: hashedPassword,
    name
  };

  res.cookie("jwt", jwt.sign({
      email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
    },
    process.env.JWT_SECRET
  ));

  await User.create(newUser);

  res.redirect("/login");
});

module.exports = router;
