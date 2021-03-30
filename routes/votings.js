const express = require('express');
const votingController = require('../controller/votings.controller');

const router = express.Router();

router.get('/', votingController.getAll);
router.post('/votings/new');
router.get('/votings/:id');

module.exports = router;
