const express = require('express');
const router = express.Router();

const votingsController = require('../controllers/votings');
const requiresLogin = require('../controllers/middlewares/requiresLogin');

router.get('/:id', requiresLogin, votingsController.getVoting);
router.post('/:id', requiresLogin, votingsController.postVoting);

router.get('/new', requiresLogin, votingsController.getNewVoting);
router.post('/new', requiresLogin, votingsController.postNewVoting);

router.post('/success', requiresLogin, votingsController.postVotingSuccess);

router.post('/error', requiresLogin, votingsController.postVotingError);

module.exports = router;
