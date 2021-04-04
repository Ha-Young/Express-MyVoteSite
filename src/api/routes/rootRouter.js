const express = require("express");
const { home, logout, myVotings } = require("../../controllers/rootController");
const { isAuthenticated } = require("../middlewares/authenticator");

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.get("/logout", logout);

rootRouter.get("/my-votings", isAuthenticated, myVotings);

module.exports = rootRouter;
