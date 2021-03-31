const express = require("express");
const router = express.Router();

const { requireAuth } = require("./middleware/requireAuth");

const User = require("../models/User");
const Voting = require("../models/Voting");

const voteController = require("./controller/votes.controller");

router.get("/new", requireAuth, function (req, res) {
  console.log("test");
  res.render("createVoting", { message: "모든 칸을 입력해주세요." });
});

router.post("/new", requireAuth, async function (req, res) {
  console.log(req.body);
  const title = req.body.title;
  const date = req.body.date;
  const options = req.body.options;
  const creator = req.session.passport.user;

  const candidates = [];

  if (!title || !options[0] || !options[1]) {
    res.render("createVoting", { message: "모든 필드를 입력해주세요" });
    return;
  }

  for (let i = 0; i < options.length; i++) {
    candidates.push({ name: options[i] });
  }

  const creatorId = req.session.passport.user;
  const newVoting = {
    title: title,
    creator: creatorId,
    due_date: date,
    candidates: candidates,
  }

  console.log(newVoting);
  await new Voting(newVoting).save();
  res.redirect("/");
});

router.get("/:vote_id", voteController.showVoteDetails);
router.put("/:vote_id", voteController.addOneToSelectedOption);


module.exports = router;
