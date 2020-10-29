/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
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

// 삭제 어디서 할건지 확실히 정해서 라우터 이동시키기
votingRouter.delete(
  '/:id',
  private,
  votingController.deleteOne
);

module.exports = votingRouter;
