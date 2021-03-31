const express = require("express");
const router = express.Router();
const votingController = require("../controllers/votingController");
const checkTokenAuth = require("./../middlewares/checkTokenAuth");

router
  .route(["/", "/upcoming", "/ongoing", "/ended", "/canceled"])
  .get(checkTokenAuth, votingController.getVotings);

router.get(
  "/search/:serch_keyword",
  checkTokenAuth,
  votingController.getVotings
);

router.get("/my-votings", checkTokenAuth, votingController.myVotings);
router.get("/my-voted", checkTokenAuth, votingController.votedVotings);

module.exports = router;
