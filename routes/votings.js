const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const alert = require('alert-node');
const createError = require('http-errors');
const User = require('../models/user');
const Poll = require('../models/poll');

var pusher = new Pusher({
  appId: '964537',
  key: 'e2a6118dfc7a6334d497',
  secret: '87f4f8af8bdeef393c07',
  cluster: 'ap3',
  encrypted: true,
});

router.get('/new', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('newvoting', { hasLoggedIn: true });
  } else {
    res.redirect('/auth/login');
  }
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

router.get('/success', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render('success', { hasLoggedIn: true });
  } else {
    res.redirect('/auth/login');
  }
});


module.exports = router;


  // pusher.trigger('poll', 'vote', {
  //   votes: 1,
  //   poll: req.body.poll
  // });