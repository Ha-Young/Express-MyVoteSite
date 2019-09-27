const router = require('express').Router();
const voteController = require('./controllers/vote.controller');

router.get('/new', (req, res) => {
  res.render('createVote', { user: req.user });
});

router.post('/new', voteController.createVote);

router.get('/success', (req, res) => {
  res.render('successVote');
});

router.get('/error', (req, res) => {
  res.render('errorVote');
});

router.get('/:id', voteController.getVote);

router.put('/:id', voteController.selectVote);

router.delete('/:id', voteController.deleteVote);

router.get('/', voteController.getMyVote);

module.exports = router;
