const express = require("express");
const router = express.Router();
const { format } = require("date-fns");
const createError = require("http-errors");

const Voting = require("../models/Voting");

router.get("/", async (req, res, next) => {
  try {
    const votingList = await Voting.find().lean();
    for (const voting of votingList) {
      voting.formattedExpirationTime = format(voting.expirationTime, "yyyy-MM-dd HH:mm");
      voting.formattedPostingTime = format(voting.postingTime, "yyyy-MM-dd HH:mm");
    }

    res.render("index", {
      user: res.locals.userEmail,
      votingList,
    });
  } catch (err) {
    next(createError(500, err.message));
  }
});

module.exports = router;
