const express = require("express");
const router = express.Router();
const votingController = require("../controllers/votingController");

router.get("/", votingController.getAllVotings);
router.get("/upcoming");
router.get("/ongoing");
router.get("/end");
router.get("/canceled");
router.get("/my-votings", votingController.getMyVotings);

module.exports = router;
