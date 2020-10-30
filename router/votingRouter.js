const express = require('express');
const votingRouter = express.Router();
const votingController = require('../controllers/voting.controller');
const { authenticateUser, private } = require('../middlewares/auth.middleware');

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
  private,
  votingController.deleteOne
);

module.exports = votingRouter;
