const express = require('express');

const voteController = require('../controllers/vote.controller');
const { checkLoggedIn, addUserInfo } = require('../middlewares/auth');

const router = express.Router();

router.get('/', addUserInfo, voteController.renderAllVotes);
router.get('/myvotes', checkLoggedIn, voteController.renderMyVote);
router.use('/auth', require('./auth'));
router.use('/vote', require('./vote'));

module.exports = router;
