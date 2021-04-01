const express = require("express");
const router = express.Router();

const userController = require("./controllers/user.controller");
const votingController = require("./controllers/voting.controller");

const { confirmSignUpData, confirmLoginData } = require("./middlewares/validation"); // joi사용하기
const { verifyToken, isAuthenticated, getUserDataByToken } = require("./middlewares/authorization"); // joi사용하기

router.get(
	"/", 
	verifyToken, 
	getUserDataByToken, 
	votingController.getAllVotings
);
router.get(
	"/logout", 
	verifyToken, 
	getUserDataByToken, 
	userController.logout
);

router.get(
	"/my-votings", 
	verifyToken, 
	isAuthenticated, 
	votingController.getMyVotingPage
);

router.get("/login", userController.getLogIn);
router.post(
	"/login", 
	confirmLoginData,
	userController.postLogIn, 
	userController.getToken
);

router.get("/login/github", userController.getGitHubLogIn);
router.get("/login/github/callback", userController.getGitHubCallback, userController.getToken);

router.get("/signup", userController.getSignUp);
router.post(
	"/signup", 
	confirmSignUpData, 
	userController.postSignUp
);

module.exports = router;
