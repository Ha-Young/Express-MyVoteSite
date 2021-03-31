const express = require("express");
const router = express.Router();

const userController = require("./controllers/user.controller");
const votingController = require("./controllers/voting.controller");

const { confirmUserData, confirmVotingData } = require("./middlewares/validation"); // joi사용하기
const { verifyToken } = require("./middlewares/authorization"); // joi사용하기

router.get("/", votingController.getAllVotings);
router.get("/logout", verifyToken, userController.logout);

router.get("/signup", userController.getSignUp);
router.post("/signup", confirmUserData, userController.postSignUp);

router.get("/my-votings", verifyToken, votingController.getMyVotingPage);

router.get("/login", userController.getLogIn);
router.post("/login", userController.postLogIn, userController.getToken);

router.get("/login/github", userController.getGitHubLogIn);
router.get("/login/github/callback", userController.getGitHubCallback, userController.getToken);

module.exports = router;
