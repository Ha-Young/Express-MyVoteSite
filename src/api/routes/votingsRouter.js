const express = require("express");
const { isAuthenticated } = require("../middlewares/authenticator");
const { validatePutVoting } = require("../middlewares/validator");
const {
  getNewVoting,
  postNewVoting,
  votingSuccess,
  votingFail,
  getVoting,
  putVoting,
  deleteVoting
} = require("../../controllers/votingsController");

const votingRouter = express.Router();

votingRouter.get("/new", isAuthenticated, getNewVoting);
votingRouter.post("/new", postNewVoting);

votingRouter.get("/success", isAuthenticated, votingSuccess);
votingRouter.get("/error", votingFail);

votingRouter.get("/:id", getVoting);
votingRouter.put("/:id", validatePutVoting, putVoting);

votingRouter.delete("/:id/delete", deleteVoting);

module.exports = votingRouter;
