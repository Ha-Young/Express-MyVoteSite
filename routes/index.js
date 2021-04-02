const express = require("express");
const router = express.Router();

const signupRouter = require("../routes/signup");
const loginRouter = require("../routes/login");
const votingRouter = require("../routes/votings");

router.use("/signup", signupRouter);
router.use("/login", loginRouter);
router.use("/votings", votingRouter);

router.get("/", (req, res) => res.render("index"));

module.exports = router;
