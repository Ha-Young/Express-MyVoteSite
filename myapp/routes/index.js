const express = require("express");
const createError = require("http-errors");
const authRouter = require("./auth");
const Voting = require("../models/Voting");
const getLoginStatus = require("../utils/getLoginStatus");
const { updateAndGetVotings } = require("./controllers/voting.controller");
const router = express.Router();

router.use("/", authRouter);

router.get("/", async (req, res, next) => {
  try {
    const isLogin = getLoginStatus(req);
    const voting = await updateAndGetVotings();
    res.render("index", { isLogin, voting });
  } catch (err) {
    console.error(`get / ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

router.get("/my-votings", async (req, res, next) => {
  const myVotings = await Voting.find({
    voting_items: { $elemMatch: { voters: "6061b68a076c4013b266d988" } },
  });
  console.log(myVotings);

  res.render("myVoting", { voting: myVotings });
});

module.exports = router;
