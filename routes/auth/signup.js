const express = require("express");
const router = express.Router();
const signUpInputValidation = require("../middlewares/validation/signUpInputValidation");
const signUpController = require("../../controllers/signUpController");

router.get('/', signUpController.getSignUpPage);
router.post('/', signUpInputValidation, signUpController.registerNewUser);

module.exports = router;
