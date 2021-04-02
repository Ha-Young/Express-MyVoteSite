const express = require("express");
const createError = require("http-errors");
const authRouter = require("./auth");
const Voting = require("../models/Voting");
const getLoginStatus = require("../utils/getLoginStatus");
const getLocalTime = require("../utils/getLocalTime");
const { updateAndGetVotings } = require("./controllers/voting.controller");
const router = express.Router();

router.use("/", authRouter);

router.get("/", async (req, res, next) => {
  try {
    const isLogin = getLoginStatus(req);
    const voting = await updateAndGetVotings();
    res.render("index", { isLogin, voting, getLocalTime });
  } catch (err) {
    console.error(`get / ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

router.get("/my-votings", async (req, res, next) => {
  const isLogin = getLoginStatus(req);
  if (!isLogin) return res.status(302).redirect("/");

  const userId = req.user._id;
  const myVotings = await Voting.find({
    voting_items: { $elemMatch: { voters: userId } },
  });
  res.render("myVoting", { isLogin, voting: myVotings, getLocalTime });
});

module.exports = router;
