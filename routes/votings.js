const express = require('express');
const router = express.Router();
const isLoggedIn = require('./middleware/isLoggedIn');
const votingsController = require('./controllers/votings.controller');

router.get('/new', isLoggedIn, (req, res, next) => {
  res.render('voteCreate');
});
router.post('/new', isLoggedIn, votingsController.voteCreate);

router.get('/:id', isLoggedIn, votingsController.voteDetail);
router.patch('/:id', isLoggedIn, votingsController.voteUpdate);
router.delete('/:id', isLoggedIn, votingsController.voteDelete);

router.get('/success', isLoggedIn, votingsController.saveSuccess);
router.get('/error', isLoggedIn, votingsController.saveFailure);

module.exports = router;
