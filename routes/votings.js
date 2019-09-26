const express = require('express');
const router = express.Router();
const votingController = require('./controllers/voting.controller');
const authentication = require('./middlewares/authentication');
const vote = require('./middlewares/vote');

router.get(
  '/',
  authentication.ensureLoggedIn,
  votingController.getAll
);

router.get(
  '/new',
  authentication.ensureLoggedIn,
  votingController.typeForm
);

router.post(
  '/new',
  authentication.ensureLoggedIn,
  votingController.create
);

router.get(
  '/success',
  authentication.ensureLoggedIn,
  votingController.success
);

router.get(
  '/error',
  authentication.ensureLoggedIn,
  votingController.error
);


router.get(
  '/:id',
  authentication.ensureLoggedIn,
  vote.isDeleted,
  vote.isVoted,
  votingController.getOne
);

router.post(
  '/:id',
  authentication.ensureLoggedIn,
  vote.isDeleted,
  vote.isVoted,
  votingController.update
);

router.delete(
  '/:id',
  vote.isDeleted,
  authentication.ensureLoggedIn,
  votingController.delete
);

module.exports = router;
