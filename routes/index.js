const express = require("express");
const router = express.Router();

const userController = require("./controllers/user.controller");
const votingController = require("./controllers/voting.controller");

const { confirmUserData, confirmVotingData } = require("./middlewares/validation"); // joi사용하기
const { ErrorHandler } = require("../util/error");

router.get("/", votingController.getAllVotings);

router.get("/signup", userController.getSignUp);

router.post("/signup", confirmUserData, userController.postSignUp);

router.get("/login", userController.getLogIn);

router.post("/login", userController.postLogIn);

router.get("/login/github", userController.getGitHubLogIn);
router.get("/login/github/callback", userController.getGitHubCallback);

router.get("/my-votings", votingController.getMyVotingPage);

router.get("/votings/new", (req, res, next) => {
  res.status(200).render("newVoting");
});

router.post("/votings/new", confirmVotingData, votingController.postNewVoting);

module.exports = router;
