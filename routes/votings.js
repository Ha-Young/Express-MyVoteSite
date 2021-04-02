const express = require("express");
const { authenticateUser } = require("./middlewares/authorization");
const { validateCreatingVote, validateCastingVote } = require("./middlewares/validator");
const { getUserInfo } = require("../util/jwtHelper");
const votingController = require("./controllers/voting.cotroller");
const router = express.Router();

/* GET home page. */
router.get("/new", authenticateUser, (req, res, next) => {
  const user = getUserInfo(req.session);
  res.render("votings-new", { user });
});

router.post("/new", authenticateUser, validateCreatingVote, votingController.createVote);

router.get("/my-votings", authenticateUser, votingController.getCreatedVotes);

router.get("/:id", votingController.getVote);

router.get("/:id/result", votingController.getVoteResult);

router.patch("/:id", authenticateUser, validateCastingVote, votingController.castVote);

router.delete("/:id", authenticateUser, votingController.deleteVote);

module.exports = router;
