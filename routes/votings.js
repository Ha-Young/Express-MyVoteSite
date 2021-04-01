const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");

const authenticateUser = require("../routes/middlewares/authenticateUser");
const Vote = require("../models/Vote");
const { convert } = require("../utils/conversion");
const User = require("../models/User");

router.get("/success", (req, res, next) => {
  res.status(200).render("success");
});

router.get("/error", (req, res, next) => {
  res.status(400).render("error");
});

router.get("/new", authenticateUser, (req, res, next) => {
  res.status(200).render("newVoting");
});

router.post("/new", authenticateUser, async (req, res, next) => {
  try {
    const { title, day, hour, minute, option } = req.body;
    const author = req.user.name;
    const userId = req.user._id;
    const createdAt = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const expiredAt = convert(createdAt, day, hour, minute);

    if (expiredAt === createdAt) {
      res.render("newVoting", { message: "만료 기간 및 시간을 입력하세요" });
      return;
    }

    const options = option.map(item => ({
      content: item,
      count: 0
    }));

    const newVote = await Vote.create({
      title,
      author,
      expiredAt,
      options,
    });

    await User.findOneAndUpdate(
      {_id: userId},
      {$addToSet: {created_votes: [ newVote._id ]}}
    );

    res.redirect("/votings/success");
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const voteId = req.params.id;
    const vote = await Vote.findOne({ _id: voteId });
    let name;

    if (req.user) {
      name = req.user.name;
    }

    res.status(200).render("voting", { vote, name });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", authenticateUser, async (req, res, next) => {
  try {
    const voteId = req.params.id;
    const optionId = req.body.id;
    const userId = req.user._id;

    const vote = await Vote.findOne({_id: voteId});
    const isParticipated = vote.participated_users.some(user =>
      user.toString() === userId.toString()
    );

    if (isParticipated) {
      res.status(200).json({"participated": true});
      return;
    }

    vote.options.map((option) => {
      if (option._id.toString() === optionId) {
        option.count += 1;
      }
    });

    await vote.save();
    await Vote.findOneAndUpdate(
      {_id: voteId},
      {$addToSet: {participated_users: [ userId ]}}
    );

    res.status(200).json({"success": true});
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const voteId = req.params.id;
    const userId = req.user._id;
    await Vote.findOneAndDelete({_id: voteId});
    const user = await User.findOne({_id: userId});
    const createdVotes = user.created_votes;

    for (let i = 0; i < createdVotes.length; i++) {
      if (createdVotes[i]._id.toString() === voteId.toString()) {
        createdVotes.splice(i, 1);
      }
    }

    user.save();
    res.status(200).json({"success": true});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
