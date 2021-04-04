const express = require("express");
const router = express.Router();

const signupRouter = require("../routes/signup");
const loginRouter = require("../routes/login");
const votingRouter = require("../routes/votings");

const votingsController = require("./controllers/votings.controller");

router.use("/signup", signupRouter);
router.use("/login", loginRouter);
router.use("/votings", votingRouter);

router.get("/", votingsController.getAll);

module.exports = router;
