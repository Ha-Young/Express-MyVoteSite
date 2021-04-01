const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
dayjs.locale("ko");

const authenticateUser = require("../routes/middlewares/authenticateUser");
const Vote = require("../models/Vote");
const { convert } = require("../utils/conversion");

router.get("/new", authenticateUser, (req, res, next) => {
  res.status(200).render("newVoting");
});

router.post("/new", authenticateUser, async (req, res, next) => {
  const { title, day, hour, minute, option } = req.body;
  const author = req.user.name;
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

  await Vote.create({
    title,
    author,
    createdAt,
    expiredAt,
    options,
  });
});

router.get("/my-votings", authenticateUser, (req, res, next) => {
  res.status(200).render("myVotings");
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

module.exports = router;
