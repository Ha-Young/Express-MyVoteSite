const express = require('express');
const router = express.Router();
const votingController = require('./controllers/voting.controller');
const { ensureLoggedIn } = require('./middlewares/authentication');
const vote = require('./middlewares/vote-validation');

router.get(
  '/',
  ensureLoggedIn,
  votingController.getAll
);

router.get(
  '/new',
  ensureLoggedIn,
  votingController.typeForm
);

router.post(
  '/new',
  ensureLoggedIn,
  votingController.create
);

router.get(
  '/success',
  ensureLoggedIn,
  votingController.success
);

router.get(
  '/error',
  ensureLoggedIn,
  votingController.error
);


router.get(
  '/:id',
  ensureLoggedIn,
  vote.isDeleted,
  vote.isVoted,
  votingController.getOne
);

router.post(
  '/:id',
  ensureLoggedIn,
  vote.isDeleted,
  vote.isVoted,
  votingController.update
);

router.delete(
  '/:id',
  vote.isDeleted,
  ensureLoggedIn,
  votingController.delete
);

module.exports = router;
