const express = require("express");
const router = express.Router();

const authenticateUser = require("../routes/middlewares/authenticateUser");

/* GET home page. */
const indexController = require("../routes/controllers/index.controller");
const User = require("../models/User");
const Vote = require("../models/Vote");

router.get("/", authenticateUser, indexController.getAll);

router.get("/my-votings", authenticateUser, async (req, res, next) => {
  const userId = req.user._id;
  const user = await User.findOne({_id: userId});

  const createdVote = user.created_votes;
  const myVotings = [];

  for (let i = 0; i < createdVote.length; i++) {
    const vote = await Vote.findOne({_id: createdVote[i]});
    myVotings.push(vote);
  }

  res.status(200).render("myVotings", { myVotings });
});

module.exports = router;
