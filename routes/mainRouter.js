const express = require("express");
const router = express.Router();
const votingController = require("../controllers/votingController");

router
  .route(["/", "/upcoming", "/ongoing", "/ended", "/canceled"])
  .get(votingController.getVotings);

router.get("/search/:serch_keyword", votingController.getVotings);

router.get("/my-votings", votingController.myVotings);
router.get("/my-voted", votingController.votedVotings);

module.exports = router;
