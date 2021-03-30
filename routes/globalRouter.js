const express = require("express");
const router = express.Router();

const { main } = require("../controller/global.controller");
const { getSignIn, postSignIn, getSignUp, postSignUp } = require("../controller/user.controller");
const { authToken } = require("../middleware/authentification");

router.get("/", authToken, main);

router.get("/signIn", getSignIn);
router.post("/signIn", postSignIn);

router.get("/signUp", getSignUp);
router.post("/signUp", postSignUp);

module.exports = router;
