const express = require("express");
const router = express.Router();
const votingsController = require("./controllers/votings.controller");

router.get("/", votingsController.myPage);
router.get("/new", votingsController.createPage);
router.post("/new", votingsController.createPost);
router.get("/:id", votingsController.getVote);
router.post("/:id", votingsController.updateVoting);
router.delete("/:id/delete", votingsController.deleteVoting);

module.exports = router;
