const express = require('express');
const router = express.Router();

const Vote = require('../models/Vote');

/* GET auth page. */
router.get('/', function(req, res, next) {
  res.render('voting', { title: 'login success' });
});

router.get('/new', function(req, res, next) {
  res.render('newVote');
});

router.post('/new', async function(req, res, next) {
  const { title, expiredAt, options, description } = req.body;
  const { user: creator } = req;
  
  const formattedOptions = options.map(each => {
    return { 
      name: each,
      count: 0,
    };
  });

  const vote = new Vote({
    title,
    creator,
    expiredAt,
    description,
    options: [...formattedOptions],
  });

  try {
    await vote.save();
    res.redirect('/home');
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
