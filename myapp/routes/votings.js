const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const Voting = require("../models/Voting");
// const getLocalTime = require("../utils/getLocalTime");
// const getProgress = require("../utils/getProgress");
const getLoginStatus = require("../utils/getLoginStatus");
const { getVotingById } = require("./controllers/voting.controller");

router.get("/new", (req, res, next) => {
  console.log(req.user);
  try {
    const isLogin = getLoginStatus(req);
    if (!isLogin) return res.status(302).redirect("/");

    res.render("votingNew", { isLogin });
  } catch (err) {
    console.error(`get /new in votings.js ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const isLogin = getLoginStatus(req);
    if (!isLogin) return res.status(302).redirect("/");

    const { _id } = req.user;
    const { date, time, title, desc, item } = req.body;
    const isoString = date.concat("T", time);
    const votingItems = [];

    item.forEach((el) => {
      votingItems.push({ item: el, count: 0 });
    });

    await Voting.create({
      author: _id,
      title: title,
      description: desc,
      votingItems: votingItems,
      voters: [],
      startTime: new Date().toISOString(),
      endTime: isoString,
    });

    res.status(202).redirect("/votings/success");
  } catch (err) {
    console.error(`post /new in voting.js ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

router.get("/success", (req, res, next) => {
  const isLogin = getLoginStatus(req);
  res.render("createResult", { isLogin, isCreate: true });
});

router.get("/error", (req, res, next) => {
  const isLogin = getLoginStatus(req);
  res.render("createResult", { isLogin, isCreate: false });
});

router.get("/:votingId", async (req, res, next) => {
  try {
    const isLogin = getLoginStatus(req);
    const { votingId } = req.params;
    console.log(getVotingById);
    const votingInfo = await getVotingById(votingId);
    console.log("hello");
    // const voting = await Voting.findOne({ _id: votingId }).populate(
    //   "author",
    //   "name",
    // );

    // const {
    //   _id,
    //   author,
    //   title,
    //   description,
    //   votingItems,
    //   voters,
    //   startTime,
    //   endTime,
    // } = voting;

    // const startLocalTime = getLocalTime(startedAt);
    // const endLocalTime = getLocalTime(endedAt);
    // const isClosed = getProgress(endedAt);
    res.status(200).render("votingDetail", {
      isLogin,
      votingInfo,
    });
  } catch (err) {
    console.error(`get /:votingId in votings.js ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

module.exports = router;
