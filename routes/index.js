const express = require("express");
const { home } = require("../controllers/rootController");

const rootRouter = express.Router();

rootRouter.get("/", home);

module.exports = rootRouter;
