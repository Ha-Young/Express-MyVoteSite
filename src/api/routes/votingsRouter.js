const express = require("express");
const { isAuthenticated } = require("../middlewares/authenticator");
const { validatePostVoting } = require("../middlewares/validator");
const {
  getNewVoting,
  postNewVoting,
  votingSuccess,
  votingFail,
  getVoting,
  postVoting,
  deleteVoting
} = require("../../controllers/votingsController");

const votingRouter = express.Router();

votingRouter.get("/new", isAuthenticated, getNewVoting);
votingRouter.post("/new", postNewVoting);

votingRouter.get("/success", isAuthenticated, votingSuccess);
votingRouter.get("/error", votingFail);

votingRouter.get("/:id", getVoting);
votingRouter.post("/:id", validatePostVoting, postVoting);

votingRouter.get("/:id/delete", deleteVoting);

module.exports = votingRouter;
