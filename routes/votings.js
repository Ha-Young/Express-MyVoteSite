const express = require("express");
const router = express.Router();

const votingController = require("../controllers/voting.controller");

const { redirectIfNotLoggedIn } = require("../middlewares/checkIsAuthenticated");

router.get("/new", redirectIfNotLoggedIn, votingController.getNew);
router.post("/new", redirectIfNotLoggedIn, votingController.postNew);
router.get("/:voting_id", votingController.getVoting);
router.put("/:voting_id", redirectIfNotLoggedIn, votingController.putVoting);
router.delete("/:voting_id", redirectIfNotLoggedIn, votingController.deleteVoting);

module.exports = router;
