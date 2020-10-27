/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const express = require('express');
const votingRouter = express.Router();
const votingController = require('../controllers/voting.controller');

votingRouter.get('/', votingController.getVotingList);

votingRouter.get('/new', votingController.getVotingForm);
votingRouter.post('/new', votingController.createVote);

// get each voting
votingRouter.get('/:id', votingController.getOne);

// count update..
votingRouter.post('/:id', votingController.updateOne);

// delete
votingRouter.delete('/:id', votingController.deleteOne);

// get my voting list
votingRouter.get('/my-voting', votingController.getMyVoting);

module.exports = votingRouter;
