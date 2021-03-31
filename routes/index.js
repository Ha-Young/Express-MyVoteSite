const express = require("express");
const router = express.Router();

const Voting = require("../models/Voting");

router.get("/", async (req, res, next) => {
  try {
    const votingList = await Voting.find().lean();
    res.render("index", {
      user: { email: res.locals.userEmail || "Guest" },
      votingList,
    });
  } catch (err) {
    next(createError(500, err.message));
  }
});

module.exports = router;
