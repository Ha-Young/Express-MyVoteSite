const express = require('express');

const checkAuthentication = require('../middlewares/authenticate');
const votingControllers = require('../controllers/voting.controllers');

const router = express.Router();

router.get('/new', checkAuthentication, (req, res) => res.render('newvotes'));

router.post('/', checkAuthentication, votingControllers.registerVote);

router.get('/:id', checkAuthentication, votingControllers.renderVote);

module.exports = router;
