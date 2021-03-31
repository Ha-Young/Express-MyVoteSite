const express = require("express");
const router = express.Router();

const votingController = require("./controllers/voting.controller");

const { confirmVotingData } = require("./middlewares/validation"); // joi사용하기
const { verifyToken, getUserDataByToken, isAuthenticated } = require("./middlewares/authorization");

router.get(
	"/new", 
	verifyToken,
	isAuthenticated,
	votingController.getMyPage
);
router.post(
	"/new", 
	verifyToken,
	isAuthenticated,
	confirmVotingData, 
	votingController.postNewVoting
);

router.get(
	"/:id",
	verifyToken,
	getUserDataByToken,
	votingController.getVotingDetail
);
router.delete(
	"/:id",
	verifyToken,
	getUserDataByToken,
	votingController.deleteVoting
);
router.put(
	"/:id",
	verifyToken,
	getUserDataByToken,
	votingController.updateVoting
);

router.get("/success", (req, res, next) => {

});

router.get("/error", (req, res, next) => {

});

module.exports = router;
