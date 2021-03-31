const express = require("express");
const router = express.Router();

const votingController = require("../controllers/voting.controller");

const { redirectIfNotLoggedIn } = require("../middlewares/checkIsAuthenticated");

router.get("/new", redirectIfNotLoggedIn, votingController.newGet);
router.post("/new", redirectIfNotLoggedIn, votingController.newPost);

module.exports = router;
