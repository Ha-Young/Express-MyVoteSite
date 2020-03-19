const express = require('express');
const router = express.Router();
// const Pusher = require('pusher');
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
        return res.redirect('/votings/failure');
        // throw(createError(422, "Please select expring time for future"));
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
      // user.myPolls.push({ myPoll : poll.id })
      user.myPolls.push(poll.id);
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

router.get('/failure', authenticateLogin, function(req, res, next) {
  res.render('failure', { hasLoggedIn: true });
});


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

  const hasSolved = poll.finishedUsers.some((id) => {
    if (id === user) return true;
  });
   console.log(hasSolved);
 
  if (!hasSolved) {
    console.log('안풀었다.')
    res.locals = { poll }
    return next();
  }
  console.log('풀었다')
  res.redirect('/');
};


router.post('/:poll_id', authenticateLogin, preventVoteAgain, async (req, res, next) => {
  const { poll } = res.locals;
  const { user }  = req.session.passport;
  const { answer } = req.body;

  poll.answers.forEach((option) => {
    if (option.answer === answer) option.votes += 1;
  });

  poll.finishedUsers.push(user);
  await poll.save();
  res.redirect('/');
});


router.delete('/:poll_id', async (req, res, next) => {
  const { pollId } = req.body;
  const poll = await Poll.findById(pollId).populate('creator');
  const userId = poll.creator.id;
  const user = await User.findById(userId);
  let index = '';
  user.myPolls.some((poll, i) => {
    if (String(poll.myPoll) === String(pollId)) {
      return index = i;
    }
  });

  user.myPolls.splice(index, 1);
  await user.save();
  await Poll.findOneAndDelete(pollId);
  return res.status(200).json({ result: 'ok' });
});






// poll.expiringTime.toDateString(), 
// poll.expiringTime.toLocaleTimeString()





module.exports = router;
