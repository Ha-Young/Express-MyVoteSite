const express = require('express');
const router = express.Router();

const signupController = require('./controllers/signup.controller');
const { verifyJoinedUser } = require('./middlewares/verifyJoinedUser');

router.get('/', signupController.renderSignUp);
router.post('/', verifyJoinedUser, signupController.createUser);

module.exports = router;
