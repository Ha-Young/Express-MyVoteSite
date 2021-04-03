const express = require("express");
const router = express.Router();

const votingController = require("./controllers/voting.controller");

const { confirmVotingData } = require("./middlewares/validation");
const { verifyToken, getUserData } = require("./middlewares/authorization");

router.get("/new", verifyToken, getUserData, votingController.getNewVotingPage);
router.post("/new", verifyToken, getUserData, confirmVotingData, votingController.createNewVoting);

router.get("/:id", verifyToken, getUserData, votingController.getVotingDetail);
router.delete("/:id", verifyToken, getUserData, votingController.deleteVoting);
router.put("/:id", verifyToken, getUserData, votingController.updateVoting);

module.exports = router;
