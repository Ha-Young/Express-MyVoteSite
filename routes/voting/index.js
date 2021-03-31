const express = require("express");
const router = express.Router();

const votingController = require("../controllers/votingController");
const authenticateUser = require("../middlewares/autheticate");

router.get("/votings/new", authenticateUser, votingController.getNewVoting);

router.post("/votings/new", authenticateUser, votingController.postNewVoting);

router.get("/votings/my-votings", authenticateUser, votingController.getMyVotings);

router.get("/votings/success");

router.get("/votings/error");

router.get("/votings/:id", votingController.getDetailVoting);

router.delete("/votings/:id", votingController.deleteVoting);

router.post("/votings/:id", authenticateUser, votingController.postDetailVoting);

router.put("/votings/id");

module.exports = router;
