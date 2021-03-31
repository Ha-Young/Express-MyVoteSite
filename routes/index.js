const express = require('express');
const router = express.Router();
const voteController = require('../controllers/vote.controller');
const { checkAuthenticated } = require('../middlewares/auth');

/* GET home page. */
router.get('/', require('./home'));
router.get('/myvote', checkAuthenticated,voteController.renderMyVote);
router.use('/home', require('./home'));
router.use('/auth', require('./auth'));
router.use('/vote', require('./vote'));

module.exports = router;
