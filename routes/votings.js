const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const alert = require('alert-node');
const createError = require('http-errors');
const User = require('../models/user');
const Poll = require('../models/poll');
const authenticateLogin = require('./middlewares/authenticateLogin');
const pollResults = require('../lib/pollResults');

router.get('/new', authenticateLogin, function(req, res, next) {
  res.render('newvoting', { hasLoggedIn: true });
});

router.post('/new', async (req, res, next) => {
  try {
      const time = `${req.body.date} ${req.body.time}`;
      if (new Date() > new Date(time)) {
        throw(createError(422, "Please select expring time for future"));
      }
      
      const { topic } = req.body;
      const id = req.session.passport.user;
      let answers = [];
      for (let key in req.body) {
        if (key.includes('answer')) {
          answers.push(req.body[key]);
        }
      }
      
      const poll = await new Poll({ 
        topic, 
        creator: id, 
        expiringTime: new Date(time),
      }).save();

      const user = await User.findById(id);
      user.myPolls.push({ myPoll : poll.id })
      await user.save();
      answers.forEach((answer) => {
        poll.answers.push({ answer })
      });

      await poll.save();
      res.redirect('/votings/success');
  } catch(e) {
    next(e);
  }
});

router.get('/success', authenticateLogin, function(req, res, next) {
  res.render('success', { hasLoggedIn: true });
});


// const pusher = new Pusher({
//   appId: '964537',
//   key: 'e2a6118dfc7a6334d497',
//   secret: '87f4f8af8bdeef393c07',
//   cluster: 'ap3',
//   encrypted: true,
//   useTLS: true,
// });



router.get('/:poll_id', async (req, res, next) => {
  const id = req.params.poll_id;
  const poll = await Poll.findById(id).populate('creator');
  let isCreator = false;
  let displayResults = null;

  if (req.isAuthenticated()) {
    const { user } = req.session.passport;
    if (poll.creator.id === user) isCreator = true;
    displayResults = pollResults(isCreator, poll);

    return res.render('poll', { 
      hasLoggedIn: true, 
      timeString: [
        poll.expiringTime.toDateString(), 
        poll.expiringTime.toLocaleTimeString()
      ],
      isCreator,
      poll,
      displayResults,
    });
  }

  displayResults = pollResults(isCreator, poll);
  res.render('poll', { 
    hasLoggedIn: false, 
    timeString: [
      poll.expiringTime.toDateString(), 
      poll.expiringTime.toLocaleTimeString()
    ],
    isCreator,
    poll,
    displayResults,
  });
});


const preventVoteAgain = async (req, res, next) => {
  const { user }  = req.session.passport;
  const pollId = req.params.poll_id;
  const poll = await Poll.findById(pollId);
  const hasSolved = poll.finishedUsers.every((id) => {
     if (id === user) return false;
  });

  // console.log(hasSolved);
  if (hasSolved) {
    res.locals = { poll }
    return next();
  }

  res.redirect('/');
  ////중복유저 체크시 just redirect login;
};


router.post('/:poll_id', authenticateLogin, preventVoteAgain, async (req, res, next) => {
  // const { poll } = res.locals;
  // const { user }  = req.session.passport;
  // const { answer } = req.body;
  // poll.answers.forEach((option) => {
  //   if (option.answer === answer) option.votes += 1;
  // });

  // poll.finishedUsers.push(user);
  // await poll.save();
  
  // console.log(poll);

  /////////need to show delete button for the user
  //////need to show result to the creator 
  //////need to show result if poll was expired

  // console.log(req.session)
  // console.log('request came');
  // console.log(req.body)
  //  pusher.trigger('poll', 'vote', {
  //   votes: 1,
  //   os:req.body.os
  // });
});

router.delete('/:poll_id', async (req, res, next) => {
  const { pollId } = req.body;
  const poll = await Poll.findById(pollId).populate('creator');
  const userId = poll.creator.id;
  const user = await User.findById(userId);
  let index = '';
  user.myPolls.some((poll, i) => {
    console.log(i)
    console.log(poll.myPoll)
    console.log(pollId)
    // console.log(poll.myPoll === pollId);
    console.log(poll.myPoll.equals(pollId))
    if (String(poll.myPoll) === String(pollId)) {
      return index = i;
    }
  });

  console.log(index, 'indexxxxxxxxxxxxxxxxxx');
  // console.log(poll);
  // console.log(user);
});






// poll.expiringTime.toDateString(), 
// poll.expiringTime.toLocaleTimeString()





module.exports = router;
