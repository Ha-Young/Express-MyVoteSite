const express = require("express");
const router = express.Router();

const votingController = require("./controllers/voting.controller");

const { confirmVotingData } = require("./middlewares/validation"); // joi사용하기
const { verifyToken } = require("./middlewares/authorization");

router.get("/success", (req, res, next) => {

});

router.get("/error", (req, res, next) => {

});

router.get("/new", verifyToken, votingController.getMyPage);
router.post("/new", verifyToken, confirmVotingData, votingController.postNewVoting);

router.get("/:id", votingController.getVotingDetail);
router.delete("/:id", verifyToken, votingController.deleteVoting);
router.put("/:id", votingController.updateVoting);

module.exports = router;
