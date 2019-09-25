const express = require('express');
const router = express.Router();
const Voting = require('../models/Voting');
const { addIsOnProgressPropertyTo } = require('../util');


// votings router
router.get('/', async(req, res, next) => {
  const myVotings = await Voting.find({ creator: req.user._id });
  const editedMyVotings = await Promise.all(await myVotings.map(async(voting) => {
    const editedVoting = JSON.parse(JSON.stringify(voting._doc));
    addIsOnProgressPropertyTo(editedVoting, voting);
    return editedVoting;
  }));
  res.render(('votings'), {
    user: req.user,
    votings: editedMyVotings
  });
});

// votings/:id router
router.get('/:id', async(req, res, next) => {
  const votingId = req.params.id;
  const voting = await Voting.findOne({ _id: votingId });
  const isCreator = String(voting.creator) === String(req.user._id);
  const editedVoting = JSON.parse(JSON.stringify(voting._doc));
  addIsOnProgressPropertyTo(editedVoting, voting);
  res.render(('voting'), {
    user: req.user,
    voting: editedVoting,
    isCreator
  });
});
//ajax는 데이터를 다루고 화면을 보내주는 것은 아님 client에서..
//ajax delete method ets vs form get/post
router.delete('/:id', async(req, res, next) => {
  console.log(req.params, '확인해보기');
  await Voting.findByIdAndDelete({_id: req.params.id});
  res.status(201).end();
});

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
