var express = require("express");
var router = express.Router();
const { isLoggedIn } = require("./middlewares/authorization");
const votingController = require("./controllers/voting.controller");

/* GET home page. */
router.get("/", isLoggedIn, votingController.getAll);

module.exports = router;
