const router = require("express").Router();

const myVotingsController = require("./controllers/myVotingsController");

router
  .route("/")
  .get(myVotingsController.renderMyVotingsPage);

module.exports = router;
