const express = require("express");
const { authenticateToken } = require("./middlewares/authorization");
const { validateVote } = require("./middlewares/validator");
const votingController = require("./controllers/voting.cotroller");
const router = express.Router();

/* GET home page. */
router.get("/new", authenticateToken, (req, res, next) => {
  res.render("votings-new");
});

router.post("/new", validateVote, votingController.saveVote);

module.exports = router;
