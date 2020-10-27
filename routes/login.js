const express = require('express');
const router = express.Router();

const loginController = require('./controllers/login.cotroller');

router.get('/', loginController.renderLogIn);
router.post('/', loginController.localLogIn);

module.exports = router;
