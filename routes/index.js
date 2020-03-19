const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authorization');
const indexController = require('../controller/index.controller');

router.get('/', indexController.getAll);
router.get('/my-votings', ensureAuthenticated, indexController.getMyVotings);

module.exports = router;
