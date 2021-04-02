const express = require('express');
const router = express.Router();
const isLoggedIn = require('./middleware/isLoggedIn');
const votingsController = require('../controllers/votings.controller');
const wrapAsync = require('../utils/wrapAsync');

router.get('/new', isLoggedIn, (req, res, next) => {
  try {
    res.status(200).render('voteCreate');
  } catch (e) {
    next(e);
  }
});
router.post('/new', isLoggedIn, wrapAsync(votingsController.voteCreate));
router.get('/success', isLoggedIn, votingsController.createSuccess);

router.get('/:id', wrapAsync(votingsController.voteDetail));
router.get('/:id/result', isLoggedIn, wrapAsync(votingsController.voteResult));
router.patch('/:id', isLoggedIn, wrapAsync(votingsController.voteUpdate));
router.delete('/:id', isLoggedIn, wrapAsync(votingsController.voteDelete));

module.exports = router;
