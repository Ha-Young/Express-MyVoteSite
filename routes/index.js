const express = require('express');
const router = express.Router();
const gateKeeper = require('./middlewares/gateKeeper');
const { getAll, getMine } = require('./controllers/getVotings.controller');

router.get('/', getAll);
router.get('/my-votings', gateKeeper, getMine);

module.exports = router;
