const express = require("express");
const {
  getNewVoting,
  postNewVoting,
  votingSuccess,
  votingFail,
  getVoting,
  postVoting
} = require("../../controllers/votingsController");
const { isAuthenticated } = require("../middlewares/authenticator");
const { validatePostNewVoting } = require("../middlewares/validator");

const votingRouter = express.Router();

votingRouter.get("/new",isAuthenticated, getNewVoting);
votingRouter.post("/new",validatePostNewVoting, postNewVoting);

votingRouter.get("/success",isAuthenticated, votingSuccess);
votingRouter.get("/error", votingFail);

votingRouter.get("/:id", getVoting);
votingRouter.post("/:id", postVoting);

module.exports = votingRouter;
