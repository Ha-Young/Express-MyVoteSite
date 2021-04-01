const express = require('express');
const router = express.Router();
const isLoggedIn = require('./middleware/isLoggedIn');
const votingsController = require('../controllers/votings.controller');
const wrapAsync = require('../utils/wrapAsync');

router.get('/new', isLoggedIn, (req, res, next) => {
  res.status(200).render('voteCreate');
});
router.post('/new', isLoggedIn, wrapAsync(votingsController.voteCreate));
router.get('/success', isLoggedIn, wrapAsync(votingsController.createSuccess));

router.get('/:id', wrapAsync(votingsController.voteDetail));
router.patch('/:id', isLoggedIn, votingsController.voteUpdate);
router.delete('/:id', isLoggedIn, wrapAsync(votingsController.voteDelete));

module.exports = router;
