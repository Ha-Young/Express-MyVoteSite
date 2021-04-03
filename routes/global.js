const express = require("express");
const router = express.Router();

const userController = require("./controllers/user.controller");
const votingController = require("./controllers/voting.controller");

const { confirmSignUpData, confirmLoginData } = require("./middlewares/validation");
const { verifyToken, getUserData } = require("./middlewares/authorization");

router.get("/", verifyToken, getUserData, votingController.getAllVotings);

router.get("/logout", verifyToken, getUserData, userController.logOut);

router.get("/my-votings", verifyToken, getUserData, votingController.getMyVotingPage);

router.get("/login", userController.logIn);
router.post("/login", confirmLoginData, userController.tryLocalLogIn, userController.getToken);

router.get("/login/github", userController.gitHubLogIn);
router.get("/login/github/callback", userController.tryGitHubLogIn, userController.getToken);

router.get("/signup", userController.signUp);
router.post("/signup", confirmSignUpData, userController.trySignUp);

module.exports = router;
