const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const Voting = require("../models/Voting");
const getLoginStatus = require("../utils/getLoginStatus");
const {
  getVotingById,
  createVoting,
  deleteVoting,
} = require("./controllers/voting.controller");

router.get("/new", (req, res, next) => {
  try {
    const isLogin = getLoginStatus(req);
    if (!isLogin) return res.status(302).redirect("/");
    res.status(200).render("votingNew", { isLogin });
  } catch (err) {
    console.error(`get /new in votings.js ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

router.post("/new", async (req, res, next) => {
  try {
    const isLogin = getLoginStatus(req);
    if (!isLogin) return res.status(302).redirect("/");
    await createVoting(req);
    res.status(200).redirect("/votings/success");
  } catch (err) {
    console.error(`post /new in voting.js ${err.message}`);
    res.status(500).redirect("/votings/error");
  }
});

router.get("/success", (req, res, next) => {
  const isLogin = getLoginStatus(req);
  res.status(200).render("createResult", { isLogin, isCreate: true });
});

router.get("/error", (req, res, next) => {
  const isLogin = getLoginStatus(req);
  res.status(200).render("createResult", { isLogin, isCreate: false });
});

router.get("/:votingId", async (req, res, next) => {
  try {
    const { votingId } = req.params;
    const isLogin = getLoginStatus(req);
    const votingInfo = await getVotingById(votingId);
    let isAuthor = false;

    if (isLogin) {
      const userId = req.user._id;
      const authorId = votingInfo.author._id;
      isAuthor = userId.equals(authorId) ? true : false;
    }

    res.status(200).render("votingDetail", {
      isLogin,
      isAuthor,
      votingInfo,
    });
  } catch (err) {
    console.error(`get /:votingId in votings.js ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

router.get("/:votingId/delete", async (req, res, next) => {
  try {
    const isLogin = getLoginStatus(req);
    if (!isLogin) return res.status(302).redirect("/");

    const { votingId } = req.params;
    const userId = req.user._id;

    await deleteVoting(userId, votingId);
    res.status(302).redirect("/");
  } catch (err) {
    console.error(`get /:votingId delete in votings.js ${err.message}`);
    next(createError(500, "Internal Server Error"));
  }
});

module.exports = router;
