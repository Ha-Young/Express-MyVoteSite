const express = require('express');
const router = express.Router();
const votingsController = require('../controllers/votingsController');

router.get('/new', votingsController.getNewVoting);

module.exports = router;
