const express = require("express");
const router = express.Router();
const Vote = require("../models/Vote");
const verifyToken = require("./middlewares/authorization");

router.get("/", async (req, res) => {
  const votes = await Vote.find();
  const currentDate = new Date();

  votes.forEach(vote => {
    if (vote.endDate <= currentDate) {
      vote.isOnVote = false;
    }

    vote.save();
  });
  console.log(votes);
  res.render("index", { votes });
});

router.post("/", verifyToken, async (req, res) => {
  const {
    title,
    startDate,
    endDate,
    option
  } = req.body;
  const { id } = req.user;

  const isStartDateFaster = new Date(startDate) < new Date(endDate);

  if (!isStartDateFaster) {
    res.redirect("/");
    return;
  }

  const optionListObj = option.map(title => {
    return { optionTitle: title };
  });

  try {
    await Vote.create({
      title: title,
      creator: id,
      endDate: endDate,
      option: optionListObj
    });

    res.redirect("/");
  } catch {
    res.redirect("/");
  }
});

module.exports = router;
