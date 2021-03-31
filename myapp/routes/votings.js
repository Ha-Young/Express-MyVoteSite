const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const Voting = require("../models/Voting");
const getLocalTime = require("../utils/getLocalTime");
const getProgress = require("../utils/getProgress");

router.get("/new", (req, res, next) => {
  try {
    res.render("votingNew");
  } catch (err) {
    console.error(`get /new in votings.js ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

router.post("/new", async (req, res, next) => {
  try {
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

    res.status(202).redirect("new");
  } catch (err) {
    console.error(`post /new in voting.js ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

router.post("/delete", async (req, res, next) => {
  try {
    await Voting.deleteOne({});
  } catch (err) {
    console.error(`get /new in votings.js ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

router.get("/:votingId", async (req, res, next) => {
  console.log(req.query);
  try {
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
