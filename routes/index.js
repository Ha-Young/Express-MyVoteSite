const express = require('express');
const router = express.Router();
const indexController = require('./controllers/index.controller');

router.get('/', indexController.getAllVotings);
router.post('/', indexController.createVoting);

module.exports = router;
