const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");
const newVotingInputValidation = require("../middlewares/validation/newVotingInputValidation");
const votingController = require("../../controllers/votingController");
const verifyUser = require("../middlewares/verifyUser");

router.get("/new", verifyAuth, votingController.getNewVotingPage);
router.post("/new", verifyAuth, newVotingInputValidation, votingController.postNewVoting);

router.get("/:id", votingController.getSelectedVoting);
router.put("/:id", verifyUser, votingController.updateVoting);
router.delete("/:id", verifyAuth, votingController.deleteVoting);

module.exports = router;
