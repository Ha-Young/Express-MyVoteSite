const express = require("express");
const router = express.Router();

const votingController = require("../controllers/votingController");
const authenticateUser = require("../middlewares/autheticate");

router.get("/votings/new", authenticateUser, votingController.getNewVoting);

router.post("/votings/new", authenticateUser, votingController.postNewVoting);

router.get("/votings/my-votings", authenticateUser, votingController.getMyVotings);

router.get("/votings/:id", votingController.getDetailVoting);

router.delete("/votings/:id", votingController.deleteVoting);

router.patch("/votings/:id", authenticateUser, votingController.patchDetailVoting);

module.exports = router;
