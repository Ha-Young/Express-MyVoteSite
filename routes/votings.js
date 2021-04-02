const express = require("express");
const router = express.Router();

const { requireAuth } = require("./middleware/requireAuth");
const requireAuthToUpdate = require("./middleware/requireAuthToUpdate");
const User = require("../models/User");
const Voting = require("../models/Voting");

const voteController = require("./controller/votes.controller");

router.get("/new", requireAuth, function (req, res) {
  const isLoggedIn = req.session.passport ? true : false;

  res.render("createVoting",
    {
      message: "모든 칸을 입력해주세요.",
      isLoggedIn: isLoggedIn
    }
  );
});

router.post("/new", requireAuth, async function (req, res) {
  const title = req.body.title;
  const date = req.body.date;
  const time = req.body.time;
  const options = req.body.options;
  const creatorId = req.session.passport.user;
  const candidates = [];

  if (!title || !options[0] || !options[1]) {
    res.render("createVoting", { message: "모든 필드를 입력해주세요" });
    return;
  }

  for (let i = 0; i < options.length; i++) {
    candidates.push({ name: options[i] });
  }

  const creator = await User.findById(creatorId);
  const creatorUsername = creator.username;

  const newVoting = {
    title: title,
    creator: creatorId,
    creator_username: creatorUsername,
    due_date: date,
    due_time: time,
    candidates: candidates,
  }
  const createdVoting = await new Voting(newVoting).save();

  await User.updateOne(
    { _id: creatorId },
    { $push: { created_votings: createdVoting._id } });

  res.redirect("/");
});

router.get("/:vote_id", voteController.showVoteDetails);
router.put("/:vote_id", requireAuthToUpdate, voteController.addOneToSelectedOption);
router.delete("/:vote_id", requireAuth, voteController.deleteVoting);

module.exports = router;
