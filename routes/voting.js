const express = require("express");
const { authenticateToken } = require("./middlewares/authorization");
const { validateVote } = require("./middlewares/validator");
const votingController = require("./controllers/voting.cotroller");
const router = express.Router();

/* GET home page. */
router.get("/new", authenticateToken, (req, res, next) => {
  const user = getUserInfo(req.cookies);
  res.render("votings-new", { user });
});

router.post("/new", authenticateToken, validateVote, votingController.saveVote);

router.get("/my-votings", authenticateToken, votingController.getCreatedVotes);

module.exports = router;
