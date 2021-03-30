const express = require("express");
const router = express.Router();

const signUpInputValidation = require("../middlewares/signUpInputValidation");
const signUpController = require("../../controllers/signUpController");

router.get('/', signUpController.getSignUpPage);
router.post('/', signUpInputValidation, signUpController.registerNewUser);

module.exports = router;
