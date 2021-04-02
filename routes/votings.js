const express = require("express");
const router = express.Router();

const authenticateUser = require("../routes/middlewares/authenticateUser");
const authenticateUserToSubmit = require("../routes/middlewares/authenticateUserToSubmit");
const votingsController = require("../routes/controllers/votings.controller");

router.get("/success", votingsController.renderSuccess);

router.get("/new", authenticateUser , votingsController.renderNewVoting);
router.post("/new", authenticateUser , votingsController.postNewVoting);

router.get("/:id", votingsController.renderVoting);
router.put("/:id", authenticateUserToSubmit, votingsController.castVote);
router.delete("/:id", authenticateUserToSubmit, votingsController.deleteVote);

module.exports = router;
