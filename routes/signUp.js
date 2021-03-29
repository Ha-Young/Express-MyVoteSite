const express = require("express");
const router = express.Router();

const signUpController = require("./controller/signUpController");
const validationHandler = require("./middleware/validationHandler");

router.get("/", signUpController.renderSignUpPage);
router.post("/", validationHandler.register, signUpController.createUser);

module.exports = router;
