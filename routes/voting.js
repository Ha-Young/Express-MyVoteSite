const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/auth');
const validationVote = require('../middlewares/validationVote');
const controller = require('../controllers/vote.Controller');

router.get('/', controller.renderVoteList);

router.get('/my-voting', authorization, controller.renderPersonalPage);

router.get('/new', authorization, controller.renderNewVote);

router.post('/new', authorization, validationVote, controller.handleNewVote);

router.get('/:id', controller.renderDetailVote);

router.put('/:id', authorization, controller.handleUpdateVote);

router.delete('/:id', authorization, controller.handleDeleteVote);

module.exports = router;
