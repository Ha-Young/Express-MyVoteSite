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
    options
  });
});

router.get("/my-votings", authenticateUser, (req, res, next) => {
  res.status(200).render("myVotings");
});

router.get("/:id", async (req, res, next) => {
  try {
    const voteId = req.params.id;
    const vote = await Vote.findOne({ _id: voteId });
    const name = req.user.name;
    res.status(200).render("voting", { vote, name });
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  if (!req.user) {
    res.status(200).render("failure", { message: "로그인 후 이용해주세요", state: "login" });
    return;
  }

  const voteId = req.params.id;
  const choice = req.body.option;
  const userId = req.user._id;

  try {
    const vote = await Vote.findOne({_id: voteId});
    const isParticipated = vote.participated_users.some(user =>
      user.toString() === userId.toString()
    );

    if (isParticipated) {
      res.render("failure", { message: "이미 참여하신 투표군요.." });
      return;
    }

    await Vote.findOneAndUpdate(
      {_id: voteId},
      {$addToSet: {participated_users: [ userId ]}}
    );

    for (let i = 0; i < vote.options.length; i++) {
      if (vote.options[i].content === choice) {
        vote.options[i].count += 1;
      }
    }

    vote.save();
    res.render("success", { message: "투표에 참여해주셔서 감사합니다", state: "vote" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
