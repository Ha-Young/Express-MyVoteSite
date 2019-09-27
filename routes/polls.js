const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/authentication');
const {
  handleGetMyPolls,
  handleGetPoll,
  handlePostNewPoll,
  handleDeletePoll,
  handleVoteSubmit,
  renderSuccess,
  renderFailure,
  renderNewPoll,
} = require('../controllers/polls.controller');

router.get('/', ensureAuthenticated, handleGetMyPolls);

router.get('/success', ensureAuthenticated, renderSuccess);

router.get('/failure', ensureAuthenticated, renderFailure);

router.get('/new', ensureAuthenticated, renderNewPoll);

router.post('/new', ensureAuthenticated, handlePostNewPoll);

router.get('/:poll_id', ensureAuthenticated, handleGetPoll);

router.post('/:poll_id', ensureAuthenticated, handleVoteSubmit);

router.delete('/:poll_id', ensureAuthenticated, handleDeletePoll);

module.exports = router;
