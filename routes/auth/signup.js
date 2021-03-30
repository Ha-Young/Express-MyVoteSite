const express = require("express");
const router = express.Router();

const signUpInputValidation = require("../middlewares/signUpInputValidation");
const signUpController = require("../../controllers/signUpController");
const verifyUser = require("../middlewares/verifyUser");

router.get('/', verifyUser, signUpController.getSignUpPage);
router.post('/', signUpInputValidation, signUpController.registerNewUser);

module.exports = router;
