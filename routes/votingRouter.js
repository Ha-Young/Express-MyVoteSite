const express = require("express");
const router = express.Router();
const votingController = require("../controllers/votingController");

// 투표 생성창
router
  .route("/new")
  .get(votingController.getNewVoting)
  .post(votingController.postNewVoting);
router.get("/success", votingController.getSuccess);
router.get("/error", votingController.getFail);

// 투표 상세창
router
  .route("/:id")
  .get(votingController.getCurrentVoting)
  .post(votingController.postCurrentVoting)
  .delete(votingController.deleteCurrentVoting);

module.exports = router;
