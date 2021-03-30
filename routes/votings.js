const express = require('express');
const router = express.Router();
const isLoggedIn = require('./middleware/isLoggedIn');
const votingsController = require('./controllers/votings.controller');

router.get('/new', isLoggedIn, (req, res, next) => {
  res.render('votingCreate');
});
router.post('/new', isLoggedIn, votingsController.voteCreatePost);

router.get('/:id', isLoggedIn, votingsController.voteDetail);
router.patch('/:id', isLoggedIn, votingsController.voteCheck);
router.delete('/:id', isLoggedIn, votingsController.voteDelete);

router.get('/success', isLoggedIn, votingsController.saveSuccess);
router.get('/error', isLoggedIn, votingsController.saveFailure);

module.exports = router;
