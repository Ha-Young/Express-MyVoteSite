const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const Voting = require("../models/Voting");
const getLocalTime = require("../utils/getLocalTime");
const getProgress = require("../utils/getProgress");
const getLoginStatus = require("../utils/getLoginStatus");

router.get("/new", (req, res, next) => {
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

    const { date, time, title, desc, item } = req.body;
    const isoString = date.concat("T", time);
    const votingItems = [];

    item.forEach((el) => {
      votingItems.push({ item: el, count: 0 });
    });

    await Voting.create({
      // author: "김태리",
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
    const voting = await Voting.findOne({ _id: votingId });
    const {
      _id,
      author,
      title,
      description,
      votingItems,
      voters,
      startTime,
      endTime,
    } = voting;

    const startLocalTime = getLocalTime(startTime);
    const endLocalTime = getLocalTime(endTime);
    const isClosed = getProgress(endTime);

    res.status(200).render("votingDetail", {
      isLogin,
      _id,
      author,
      title,
      description,
      votingItems,
      voters,
      startLocalTime,
      endLocalTime,
      isClosed,
    });
  } catch (err) {
    console.error(`get /:votingId in votings.js ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

module.exports = router;
