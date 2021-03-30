const express = require("express");
const User = require("../models/User");
const router = express.Router();

const Vote = require("../models/Vote");

router.get("/new", (req, res, next) => {
  res.status(200).render("newVoting");
});

router.get("/my-votings", (req, res, next) => {
  res.status(200).render("myVotings");
});

router.get("/:id", async (req, res, next) => {
  try {
    const voteId = req.params.id;
    const vote = await Vote.findOne({ _id: voteId });
    res.status(200).render("voting", { vote });
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  const voteId = req.params.id;
  const choise = req.body.option;
  const userEmail = req.user.email;

  try {
    const vote = await Vote.findOne({_id: voteId});
    const isParticipated = vote.participated_users.some(user => user === userEmail);

    if (isParticipated) {
      //이미 참여 하신 투표군요....라고 띄우기. flash?
      res.redirect("/");
      return;
    }

    await Vote.findOneAndUpdate(
      {_id: voteId},
      {$addToSet: {participated_users: [ userEmail ]}}
    );

    for (let i = 0; i < vote.options.length; i++) {
      if (vote.options[i].content === choise) {
        vote.options[i].count += 1;
      }
    }

    vote.save();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
