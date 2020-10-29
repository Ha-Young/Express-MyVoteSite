const express = require('express');
const router = express.Router();
const successController = require('./controllers/success.controller');
const { isLoggedIn } = require('../middleware/authorization');

router.get('/:message', isLoggedIn, successController.success);

module.exports = router;
