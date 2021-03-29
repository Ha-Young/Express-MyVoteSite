const express = require("express");
const router = express.Router();

const Post = require("../models/Voting");

router.get("/", async (req, res, next) => {
  try {
    const votings = await Post.find();

    res.render("index", { votings });
  } catch (error) {
    console.error(error.message);
    next(createError(500, "Server Error"));
  }
});

module.exports = router;
