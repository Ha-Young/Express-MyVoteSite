const express = require('express');
const router = express.Router();
const checkUser = require('../middlewares/checkUser');
const indexController = require('../controllers/index.controller');

router.get('/', indexController.getAllVotings);
router.get('/my-votings', checkUser, indexController.getMyVotings);

module.exports = router;
