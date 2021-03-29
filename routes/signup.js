const express = require("express");
const router = express.Router();

const signupController = require("../controllers/signup.controller");
const { isNotAuthenticated } = require("../middlewares/checkIsAuthenticated");

router.get("/", isNotAuthenticated, signupController.get);
router.post("/", isNotAuthenticated, signupController.post);

module.exports = router;
