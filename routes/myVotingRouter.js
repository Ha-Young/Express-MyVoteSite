var express = require('express');
var router = express.Router();

const { isSignIn, redirectIfUserNone } = require("../middleware/authentification");
const { getMyVotes } = require("../controller/user.controller");

router.get('/', isSignIn, redirectIfUserNone, getMyVotes);

module.exports = router;
