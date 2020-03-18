const express = require('express');

const checkAuthentication = require('../middlewares/authenticate');
const votingControllers = require('../controllers/voting.controllers');

const router = express.Router();

router.get('/new', checkAuthentication, (req, res) => res.render('newvotes'));

router.post('/', checkAuthentication, votingControllers.registerVote);

router.delete('/', checkAuthentication, votingControllers.deleteVote)

router.get('/:id', votingControllers.renderVote);

router.post('/:id', checkAuthentication, votingControllers.registerCastingVote);

module.exports = router;
