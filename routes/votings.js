const express = require("express");
const router = express.Router();
const { createVotePage } = require("../controllers/votingsController");
const verifyToken = require("./middlewares/authorization");

router.get("/new", verifyToken, createVotePage);

module.exports = router;
