const express = require("express");
const { authenticateUser, authenticateToken } = require("./middlewares/authorization");
const { validateCreatingVote, validateCastingVote } = require("./middlewares/validator");
const { getUserInfo } = require("../util/jwtHelper");
const votingController = require("./controllers/voting.cotroller");
const router = express.Router();

/* GET home page. */
router.get("/new", authenticateToken, (req, res, next) => {
  const user = getUserInfo(req.cookies);
  res.render("votings-new", { user });
});

router.post("/new", authenticateToken, validateCreatingVote, votingController.createVote);

router.get("/my-votings", authenticateUser, votingController.getCreatedVotes);

router.get("/:id", votingController.getVote);

router.get("/:id/result", authenticateToken, votingController.getVoteResult);

router.patch("/:id", authenticateToken, validateCastingVote, votingController.castVote);

router.delete("/:id", authenticateToken, votingController.deleteVote);

module.exports = router;
