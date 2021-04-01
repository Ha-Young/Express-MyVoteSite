const express = require("express");
const createError = require("http-errors");
const authRouter = require("./auth");
const Voting = require("../models/Voting");
const getLoginStatus = require("../utils/getLoginStatus");
const router = express.Router();

router.use("/", authRouter);

router.get("/", async (req, res, next) => {
  try {
    const isLogin = getLoginStatus(req);
    await Voting.updateMany(
      {
        ended_at: { $lte: new Date().getTime() },
      },
      { closed: true },
    );
    const voting = await Voting.find();

    res.render("index", { isLogin, voting });
  } catch (err) {
    console.error(`get / ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

module.exports = router;
