const express = require('express');
const router = express.Router();
const votingController = require('../api/controllers/votingController');
const expireDateValid = require('../api/middleware/expireDateValid');
const modifySelectOptions = require('../api/middleware/modifySelectOptions');
const isLoggedIn = require('../api/middleware/isLoggedIn');
const findResult = require('../api/middleware/findResult');
const handleFetchPut = require('../api/middleware/handleFetchPut');

router.get('/new', isLoggedIn, votingController.renderCreateVoting);
router.post(
  '/new',
  isLoggedIn,
  expireDateValid,
  modifySelectOptions,
  votingController.createNewVoting
);

router.get('/my-voting', isLoggedIn, votingController.renderMyVoting);

router.get('/:id', findResult, votingController.renderVoting);
router.put('/:id', handleFetchPut, votingController.receiveVotingResult);
router.delete('/:id', votingController.deleteVoting);

module.exports = router;
