const express = require("express");
const router = express.Router();
const { createVotePage } = require("../controllers/votingsController");

router.get("/new", createVotePage);

module.exports = router;
