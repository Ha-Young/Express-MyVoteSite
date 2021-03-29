const express = require("express");
const router = express.Router();

const Voting = require("../models/Voting");

router.get("/", async (req, res, next) => {
  try {
    const votings = await Voting.find();

    res.render("index", { votings });
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
});

module.exports = router;
