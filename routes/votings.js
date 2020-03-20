const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const votingsController = require('../controller/votings.cotroller');
const { ensureAuthenticated } = require('../middlewares/authorization');
const timeUtil = require('../lib/timeUtil');

router.get('/new', ensureAuthenticated, votingsController.getCreatePage);
router.post('/new', [
  check('title')
    .notEmpty()
    .withMessage('Please fill out title.'),
  check('expiration_time')
    .notEmpty()
    .withMessage('The expiration date/time does not exist or It is earlier than the current time.')
    .custom((expiration_time, { req }) => {
      return timeUtil.compareCurrentDate(req.body.expiration_date, expiration_time);
    })
    .withMessage('Please fill out the expiration date later than the current time.'),
  check('options')
    .exists()
    .custom((value) => value.every(option => option.length > 0))
    .withMessage('Please fill out at least two options.'),
], ensureAuthenticated, votingsController.createNewVote);
router.get('/:id', votingsController.getSelectedVote);
router.post('/:id', ensureAuthenticated, votingsController.voteSelectedVoting);
router.delete('/:id', ensureAuthenticated, votingsController.deleteVote);

module.exports = router;
