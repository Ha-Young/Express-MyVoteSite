const express = require('express');
const router = express.Router();
const votingController = require('./controllers/voting.controller');

router.get('/new', (req, res, next) => {
  res.render('createVote');
});

router.post('/new', votingController.createVote);

router.get('/success', (req, res, next) => {
  res.render('success');
});

router.get('/error', (req, res, next) => {
  res.render('failure');
});

router.get('/:id', votingController.getSelectedVote);
router.post('/:id', votingController.updateVote);
router.delete('/:id', votingController.deleteVote);

router.get('/', votingController.getMyVote);

module.exports = router;
