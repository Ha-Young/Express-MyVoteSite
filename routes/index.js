const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middlewares/authorization');
const indexController = require('../controller/index.controller');

router.get('/', indexController.getAllorMyVotes);
router.get('/my-votings', ensureAuthenticated, indexController.getAllorMyVotes);

module.exports = router;
