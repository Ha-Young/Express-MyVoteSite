/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const express = require('express');
const votingRouter = express.Router();
const votingController = require('../controllers/voting.controller');
const authenticateUser = require('../middlewares/auth.middleware');

votingRouter.get('/', votingController.getVotingList);

votingRouter.get('/new', votingController.getVotingForm);
votingRouter.post('/new', authenticateUser, votingController.createVote);

// get each voting
votingRouter.get('/:id', votingController.getOne);

// count update..
votingRouter.post('/:id', authenticateUser, votingController.updateOne);

// delete
votingRouter.delete('/:id', authenticateUser, votingController.deleteOne);

// get my voting list

module.exports = votingRouter;
