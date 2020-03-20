const express = require('express');
const router = express.Router();

const votingsControllers = require('./controllers/votings.controllers');

router.get('/new', (req, res, next) => res.render('newVoting'));
router.post('/new', votingsControllers.newVoting)
router.get('/:voting_id', votingsControllers.renderVoting);
router.post('/:voting_id', votingsControllers.isAuthenticated, votingsControllers.confirmVoting);
router.delete('/:voting_id', votingsControllers.deleteVoting);

module.exports = router;
