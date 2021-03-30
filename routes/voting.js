const express = require("express");
const router = express.Router();

const VotingController = require("./controllers/voting.controller");

router.get("/success", (req, res, next) => {

});

router.get("/error", (req, res, next) => {

});

router.get("/:id", VotingController.getVotingDetail);

router.delete("/:id", VotingController.deleteVoting);
router.put("/:id", VotingController.updateVoting);

module.exports = router;
