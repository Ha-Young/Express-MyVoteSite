const express = require('express');

const controller = require('../../controller');

const router = express.Router();

router.get('/', controller.signUp.getSignUpPage);
router.post('/', controller.signUp.signUpUser);
router.get('/success', controller.signUp.getSuccessPage);

module.exports = router;
