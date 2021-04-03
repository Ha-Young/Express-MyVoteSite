const express = require("express");
const router = express.Router();
const { verifyToken } = require("./middlewares/authorization");
const votingsController = require("./controllers/votings.controller");

router.get("/new", verifyToken, (req, res) => res.render("newVoting"));
router.post("/new", verifyToken, votingsController.create);

module.exports = router;
