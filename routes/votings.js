const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');


// votings router
router.get('/', async(req, res, next) => {
  myVotings = await Voting.find({ creator: req.user._id });
  res.render(('votings'), {
    user: req.user,
    votings: myVotings
  });
});

// votings/voting id router
// router.get('/:id', (req, res, next) => {
//   res.render('votings'), {
//     user: req.user,
//     votings: null
//   }
// });

// votings/new router
router.get('/new', (req, res, next) => {
  res.render('new', {
    user: req.user,
    votings: null
  });
});

router.post('/new', async(req, res, next) => {
  const options = req.body.option;
  const items = [];
  options.forEach(option => {
    items.push({
      text: option,
      voters: []
    });
  });
  try{
    await Voting.create({
      title: req.body.title,
      description: req.body.description,
      end_At: req.body.closingDate,
      creator: req.user._id,
      items
    });
    res.redirect('/');
  }catch{
    const err = new Error('Cannot create voting in DB');
    next(err);
  }
});

module.exports = router;
