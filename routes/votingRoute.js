const express = require('express');
const router = express.Router();
const votingController = require('../controllers/votingController');
const expireDateValid = require('../controllers/middleware/expireDateValid');
const modifySelectOptions = require('../controllers/middleware/modifySelectOptions');
const handleVoting = require('../controllers/middleware/handleVoting');
// const authController = require('../controllers/authController');
// const isLoggedIn = require('../controllers/middleware/isLoggedIn');

router.get('/new', votingController.renderCreateVoting);
router.post(
  '/new',
  expireDateValid,
  modifySelectOptions,
  votingController.createNewVoting
);

router.get('/my-voting', votingController.renderMyVoting);
router.get('/:id', handleVoting, votingController.renderVoting);
router.post('/:id', votingController.receiveVotingResult);

module.exports = router;
