const express = require("express");
const router = express.Router();

const signupRouter = require("../routes/signup");
const loginRouter = require("../routes/login");

router.use("/signup", signupRouter);
router.use("/login", loginRouter);

router.get("/", (req, res) => res.render("index"));
router.get("/login", (req, res) => res.render("login"));
router.get("/signup", (req, res) => res.render("signup"));

module.exports = router;
