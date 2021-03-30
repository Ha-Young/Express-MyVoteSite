const express = require("express");
const { home, logout } = require("../../controllers/rootController");

const rootRouter = express.Router();

rootRouter.get("/", home);

rootRouter.get("/logout", logout);

module.exports = rootRouter;
