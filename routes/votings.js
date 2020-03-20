var express = require('express');
var router = express.Router();
const { authorization } = require('../middlewares/authorization');
const { expiryMonitor } = require('../middlewares/expiryMonitor');
const Voting = require('../models/Voting');
const User = require('../models/User');
const { VOTING_STATUSES } = require('../constants/enums');
const { timezones } = require('../constants/timezones');
const { getIsoGmtFromDatetimeLocal } = require('../utils/utils');

router.get('/new', authorization, expiryMonitor, (req, res, next) => {
  const user = JSON.parse(JSON.stringify(req.user));
  user.tzOffsetMinutes = new Date().getTimezoneOffset();
  res.render('votings_new', { user, timezones });
});

router.post('/new', authorization, async(req, res, next) => {
  const endTimeIsoGmt = getIsoGmtFromDatetimeLocal(
    req.body.endTimeDatetimeLocal,
    req.body.tzOffsetMinutes
  );

  if (req.body.choices.length < 2) {
    const err = new Error(
      'There should be at least 2 choices when creating a voting'
    );
    console.log(err.message);
    next(err);

    // throw new Error(
    //   'There should be at least 2 choices when creating a voting'
    // );
  }

  if (new Date(endTimeIsoGmt).valueOf < new Date()) {
    const err = new Error(
      'End time should be later than now'
    );
    console.log(err.message);
    next(err);

    // throw new Error(
    //   'End time should be later than now'
    // );
  }

  const choices = req.body.choices.map(choice => {
    return { name: choice };
  });

  try {
    await Voting.create({
      author: req.user._id,
      title: req.body.title,
      choices,
      start_time: new Date().toISOString(),
      end_time: endTimeIsoGmt,
      status: VOTING_STATUSES.ACTIVE
    });
    res.redirect('/votings/success');
  } catch (err) {
    console.log('Error in voting creation, details below.\n', err);
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
  let user = req.user ? JSON.parse(JSON.stringify(req.user)) : undefined;
  try {
    let voting;
    try {
      voting = await Voting.findById( req.params.id ).exec();
      voting = JSON.parse(JSON.stringify(voting));
    } catch (err) {
      console.log('Error while finding a vote by id \n', err);
      next(err);
      // throw new Error('Error while finding a vote by id \n', err);
    }

    if (user) {
      user.isAuthor = (voting.author.toString() === user._id.toString());

      user.hasVoted = false;
      user.votes.forEach(vote => {
        if (vote.voting.toString() === req.params.id) {
          user.hasVoted = true;
        }
      });

      // should I use mongodb queries?
      if (user.hasVoted) {
        let userChoice;
        voting.votes.forEach(vote => {
          if (vote.user.toString() === user._id.toString()) {
            userChoice = vote.choice.toString();
          }
        });
        voting.choices.forEach(choice => {
          if (choice._id.toString() === userChoice) {
            user.choice = choice.name;
          }
        });
      }
    }

    if ((user && user.isAuthor) || voting.status === VOTING_STATUSES.ENDED) {
      voting.choices.forEach(choice => {
        let count = 0;
        voting.votes.forEach(vote => {
          if (vote.choice === choice._id) count++;
        });
        choice.count = count;
      });
    }

    res.render('votings', { user, voting });
  } catch (err) {
    console.log('Error while processing voting/:id\n', err);
    next(err);
  }
});

router.post('/:id', authorization, expiryMonitor, async(req, res, next) => {
  // try {
    let voting;
    try {
      voting = await Voting.findById( req.params.id ).exec();
    } catch (err) {
      console.log('Error occured while finding a vote by id from DB\n', err);
      return next(err);
      // throw new Error(err);
    }
    if (voting.status !== VOTING_STATUSES.ACTIVE) {
      console.log('User is trying to vote for a voting whose status is not active\n' + err);
      return next(err);
      // throw new Error(
      //   'User is trying to vote for a voting whose status is not active'
      // );
    }
    
    let voted;
    try {
      voted = await Voting.find({ 
        _id: req.params.id,
        'votes.user': req.user._id 
      });
    } catch (err) {
      console.log('Error occured while checking if user id is inside Voting.votes.user \n', err);
      return next(err);
      // throw new Error(err);
    }    
    if (voted.length) {
      console.log('User already voted for this poll.');
      return next(err);
      // throw new Error('User already voted for this poll.');
    };

    try {
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
    } catch (err) {
      console.log('Error while pushing a vote into Voting\n', err);
      return next(err);
      // throw new Error(err);
    }

    try {
      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            votes: {
              voting: req.params.id,
            }
          }
        }).exec();  
    } catch (err) {
      console.log('Error while pushing a vote into User\n', err);
      return next(err);
      // throw new Error(err);
    }

    res.redirect(`/votings/${req.params.id}`);
  // } catch (err) {
  //   console.log(err);
  //   next(err);
  // }
});

router.delete('/:id', authorization, async(req, res, next) => {
  try {
    await Voting.findOneAndDelete({ _id: req.params.id }).exec();
    res.status(204).redirect('/');
  } catch (err) {
    console.log('Error while finding & deleting a voting\n', err);
    next(err);
  }
});

module.exports = router;
