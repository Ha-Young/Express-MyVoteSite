/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const express = require('express');
const votingRouter = express.Router();
const votingController = require('../controllers/voting.controller');
const authenticateUser = require('../middlewares/auth.middleware');

votingRouter.get(
  '/',
  votingController.getVotingList
);

votingRouter.get(
  '/new',
  votingController.getVotingForm
);

votingRouter.post(
  '/new',
  authenticateUser,
  votingController.createVote
);

votingRouter.get(
  '/:id',
  votingController.getOne
);

votingRouter.post(
  '/:id',
  authenticateUser,
  votingController.updateOne
);

votingRouter.delete(
  '/:id',
  authenticateUser,
  votingController.deleteOne
);

module.exports = votingRouter;
