const express = require("express");
const router = express.Router();

const requireAuth = require("./middleware/requireAuth");
const requireAuthToUpdate = require("./middleware/requireAuthToUpdate");
const voteController = require("./controller/votes.controller");

router.get("/new", requireAuth, function (req, res) {
  const isLoggedIn = req.session.passport ? true : false;

  res.render("createVoting",
    {
      message: "모든 칸을 입력해주세요.",
      isLoggedIn: isLoggedIn
    }
  );
});
router.post("/new", requireAuth, voteController.createVoting);
router.get("/:vote_id", voteController.showVoteDetails);
router.put("/:vote_id", requireAuthToUpdate, voteController.addOneToSelectedOption);
router.delete("/:vote_id", requireAuth, voteController.deleteVoting);

module.exports = router;
