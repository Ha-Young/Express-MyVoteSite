const router = require("express").Router();

const { getMyVotings } = require("./controllers/myVotings.controller");

router.get("/", getMyVotings);

module.exports = router;
