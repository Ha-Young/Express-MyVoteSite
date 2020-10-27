const express = require('express');
const router = express.Router();
const { authenticate } = require('./middlewares/authenticate');
const votingController = require('./controllers/voting.controller');


router.get('/new', authenticate, (req, res, next) => {
  res.render('vote-register');
});
router.post('/new',
  votingController.validateInputs,
  votingController.createNewVote,
  (req, res, next) => {
    res.redirect('/');
});
router.get('/success', (req, res, next) => {
  res.send('success, new voting created');
});
router.get('/error', (req, res, next) => {
  res.send('error, new voting not created');
});

// 로그인 전 사용자도 접근 가능
router.get('/:id', (req, res, next) => {
  res.send('voting details');
});


module.exports = router;
