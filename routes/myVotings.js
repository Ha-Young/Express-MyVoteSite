const express = require("express");
const router = express.Router();
const { format } = require("date-fns");

const Voting = require("../models/Voting");
const User = require("../models/User");

router.get("/", async (req, res, next) => {
  try {
    const userEmail = res.locals.userEmail;
    const user = await User.findOne({ email: userEmail }).lean();
    const userId = user._id;

    const usersVotingList = await Voting.find({ publisher: userId }).lean();

    for (const voting of usersVotingList) {
      voting.formattedExpirationTime = format(voting.expirationTime, "yyyy-MM-dd HH:mm");
    }

    res.render("myVotings", {
      user: userEmail,
      myVotingList: usersVotingList
    });
  } catch (err) {
    next(createError(500, err.message));
  }
});

module.exports = router;
