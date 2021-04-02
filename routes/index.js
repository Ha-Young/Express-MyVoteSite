const express = require('express');
const router = express.Router();

const voteController = require('../controllers/vote.controller');
const { checkAuthenticated, addUserInfo } = require('../middlewares/auth');

/* GET home page. */

router.get('/', addUserInfo, voteController.renderAllVotes);
router.get('/myvotes', checkAuthenticated, voteController.renderMyVote);
router.use('/auth', require('./auth'));
router.use('/vote', require('./vote'));

module.exports = router;
