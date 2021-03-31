const express = require("express");
const router = express.Router();
const verifyAuth = require("./middlewares/verifyAuth");
const myVotingController = require("../controllers/myVotingController");

router.get('/', verifyAuth, myVotingController.getMyVotings);

module.exports = router;
