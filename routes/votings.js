var express = require('express');
var router = express.Router();
const { authorization } = require('../middlewares/authorization');
const { expiryMonitor } = require('../middlewares/expiryMonitor');
const Voting = require('../models/Voting');
const User = require('../models/User');

router.get('/new', authorization, expiryMonitor, (req, res, next) => {
  res.render('votings_new', { user: req.user });
});

router.post('/new', authorization, async(req, res, next) => {
  // console.log(req.body);
  // console.log(req.user);
  let expiryDate = req.body.expiryDate;
  function getTzOffset(tzInt) {
    if (0 <= tzInt && tzInt < 10) {
      return `0${tzInt}:00`;
    } else if (10 <= tzInt) {
      return `${tzInt}:00`;
    }
  }
  expiryDate += ':00.000+' + getTzOffset(req.body.expiryTimezone);
  // console.log(expiryDate);
  // console.log(new Date(expiryDate).toISOString());

  const choices = req.body.choices.map(choice => {
    return { name: choice };
  });
  try {
    await Voting.create({
      author: req.user._id,
      title: req.body.title,
      choices,
      end_time: req.body.expiryDate,
      status: 'ACTIVE'
    });
    res.redirect('/votings/success');
  } catch (err) {
    console.log('Error in voting creation, details below.\n', error);
    res.redirect('/votings/error');
  }
});

router.get('/success', authorization, (req, res, next) => {
  res.render('votings_success');
});

router.get('/success', authorization, (req, res, next) => {
  res.render('votings_error');
});

router.get('/:id', expiryMonitor, async(req, res, next) => {
  // two criteria - 
  // 1) status = active or not?
  // 2) voted = user voted or not ?
  const user = req.user;
  try {
    let voting = await Voting.findById( req.params.id ).exec();
    voting = JSON.parse(JSON.stringify(voting));

    // check if user already voted
    let voted = false;
    if (req.user) {
      req.user.votes.forEach(vote => {
        if (vote.voting.toString() === req.params.id) {
          voted = true;
        }
      })
    }
    // console.log(voting.author.toString() === user._id.toString());

    let isRemovable = (
      user
      && (voting.author.toString() === user._id.toString())
    );

    res.render('votings', { user, voting, voted, isRemovable });
  } catch (err) {
    console.log(err);
    // add next(err); later
  }
});

router.post('/:id', authorization, expiryMonitor, async(req, res, next) => {
  try {
    // validation if the voting is active
    const voting = await Voting.findById( req.params.id ).exec();
    if (voting.status !== 'ACTIVE') {
      throw new Error('User is trying to vote for a voting whose status is not active');
    }
    // check if user already voted
    let voted = await Voting.find({ _id: req.params.id, 'votes.user': req.user._id });
    if (voted.length) {
      throw new Error('User already voted for this poll.');
    };

    await Voting.findOneAndUpdate( 
      { _id: req.params.id },
      {
        $push: {
          votes: {
            user: req.user._id,
            choice: req.body.choice
          }
        }
      }).exec();

    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          votes: {
            voting: req.params.id,
          }
        }
      }).exec();

    res.redirect(`/votings/${req.params.id}`);
  } catch (err) {
    console.log(err);
    // add next(err); later
  }
});

router.delete('/:id', authorization, async(req, res, next) => {
  console.log('delete router');
  try {
    await Voting.findOneAndDelete({ _id: req.params.id }).exec();
    // show some alert, before delete
    console.log('before redirection');
    res.status(204).redirect('/');
  } catch (err) {
    // error handling, depending on whether the error is coming from 'find' part or 'delete' part
    next(err);
  }
});

module.exports = router;
