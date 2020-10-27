const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('new_voting');
});

router.get('/my-votings', (req, res) => {
  res.render('my_votings');
});

router.get('/:votingId', (req, res) => {
  res.render('voting', {
    voting: {
      subject: '도장깨기'
    }
  });
});


module.exports = router;
