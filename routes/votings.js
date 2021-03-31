const express = require("express");
const router = express.Router();
const {
  createVotePage,
  getVote,
  createNewVote,
  patchVoteResult,
  deleteVote
} = require("../controllers/votingsController");
const verifyToken = require("./middlewares/authorization");

router.get("/new", verifyToken, createVotePage);

router.get("/:id", getVote);

router.post("/", verifyToken, createNewVote);

router.patch("/:id", patchVoteResult);

router.delete("/:id", deleteVote);

module.exports = router;
