const express = require("express");
const router = express.Router();

const { main } = require("../controller/global.controller");
const { getSignIn, postSignIn, getSignUp, postSignUp, getSignOut } = require("../controller/user.controller");
const { isSignIn } = require("../middleware/authentification");

router.get("/", isSignIn, main);

router.get("/signIn", getSignIn);
router.post("/signIn", postSignIn);

router.get("/signUp", getSignUp);
router.post("/signUp", postSignUp);

router.get("/signOut", getSignOut);

module.exports = router;
