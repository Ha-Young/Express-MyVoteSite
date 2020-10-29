const express = require('express');
const router = express.Router();
const votingController = require('../controllers/votingController');
const expireDateValid = require('../controllers/middleware/expireDateValid');
const modifySelectOptions = require('../controllers/middleware/modifySelectOptions');
const checkCreator = require('../controllers/middleware/checkCreator');
const isLoggedIn = require('../controllers/middleware/isLoggedIn');
const validateFirstVoting = require('../controllers/middleware/validateFirstVoting');
const findResult = require('../controllers/middleware/findResult');
const handleFetchPut = require('../controllers/middleware/handleFetchPut');

router.get('/new', isLoggedIn, votingController.renderCreateVoting);
router.post(
  '/new',
  isLoggedIn,
  expireDateValid,
  modifySelectOptions,
  votingController.createNewVoting
);

router.get('/my-voting', isLoggedIn, votingController.renderMyVoting);

// router.put('/:id', validateFirstVoting, votingController.receiveVotingResult);

router.get(
  '/:id',
  votingController.renderVoting
);
router.put('/:id', handleFetchPut, votingController.receiveVotingResult);

module.exports = router;
