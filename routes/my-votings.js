const express = require('express');
const router = express.Router();

const renderMyVotings = require('./controller/myVotings.controller');

router.get('/', renderMyVotings);

module.exports = router;
