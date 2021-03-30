const express = require("express");
const {
  getNewVoting,
  postNewVoting,
  votingSuccess,
  votingFail,
  getVoting,
  postVoting
} = require("../../controllers/votingsController");

const votingRouter = express.Router();

votingRouter.get("/new", getNewVoting);
votingRouter.post("/new", postNewVoting);

votingRouter.get("/success", votingSuccess);
votingRouter.get("/error", votingFail);

votingRouter.get("/:id", getVoting);
votingRouter.post("/:id", postVoting);

module.exports = votingRouter;
