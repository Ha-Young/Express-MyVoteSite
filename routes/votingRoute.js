const express = require('express');
const router = express.Router();
const votingController = require('../controllers/votingController');
const expireDateValid = require('../controllers/middleware/expireDateValid');
const modifySelectOptions = require('../controllers/middleware/modifySelectOptions');
const handleVoting = require('../controllers/middleware/handleVoting');
const checkCreator = require('../controllers/middleware/checkCreator');
const validateFirstVoting = require('../controllers/middleware/validateFirstVoting');
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

// router.put('/:id', validateFirstVoting, votingController.receiveVotingResult);

router.get('/:id', handleVoting, checkCreator, votingController.renderVoting);
router.put('/:id', votingController.receiveVotingResult);

module.exports = router;
