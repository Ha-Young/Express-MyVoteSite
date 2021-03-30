const router = require('express').Router();

const votingsController = require('../controllers/votings.controller');
const authenticationHandler = require('../middlewares/authenticationHandler');
const validationHandler = require('../middlewares/validationHandler');

router
  .route('/:id')
  .get(votingsController.getVote)
  .delete(votingsController.deleteVote);

router
  .route('/new')
  .get(votingsController.getVotingForm)
  .post(votingsController.createVote);

module.exports = router;
