const express = require("express");
const router = express.Router();
const votingController = require("../controllers/votingController");

router.get("/", votingController.getAllVotings);

router.get("/upcoming", votingController.upcomingVotings);
router.get("/ongoing", votingController.ongoingVotings);
router.get("/ended", votingController.endedVotings);
router.get("/canceled", votingController.canceledVotings);

router.get("/search/:serch_param", votingController.searchedVotings);

router.get("/my-votings", votingController.myVotings);
router.get("/my-voted", votingController.votedVotings);

module.exports = router;
