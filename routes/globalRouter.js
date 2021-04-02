const express = require("express");
const router = express.Router();

const { main, success, error } = require("../controller/global.controller");
const { getSignIn, postSignIn, getSignUp, postSignUp, getSignOut } = require("../controller/user.controller");
const { isSignIn } = require("../middleware/authentification");

router.get("/", isSignIn, main);

router.get("/signIn", getSignIn);
router.post("/signIn", postSignIn);

router.get("/signUp", getSignUp);
router.post("/signUp", postSignUp);

router.get("/signOut", getSignOut);

router.get("/success", success);
router.get("/error", error);

module.exports = router;
