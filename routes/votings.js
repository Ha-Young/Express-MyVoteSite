const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const alert = require('alert-node');
const createError = require('http-errors');
const User = require('../models/user');
const Poll = require('../models/poll');
const authenticateLogin = require('./middlewares/authenticateLogin');


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
  poll = await Poll.findById(id).populate('creator');
  console.log(poll)
  // console.log(poll.creator)
  // console.log(poll.expiringTime);
  // console.log(poll.expiringTime.toDateString());
  // console.log(poll.expiringTime.toLocaleTimeString());
  res.render('poll', { 
    hasLoggedIn: true, 
    timeString: [
      poll.expiringTime.toDateString(), 
      poll.expiringTime.toLocaleTimeString()
    ],
    poll, 
  });
});

// poll.expiringTime.toDateString(), 
// poll.expiringTime.toLocaleTimeString()



 // pusher.trigger('poll', 'vote', {
  //   votes: 1,
  //   poll: req.body.poll
  // });

module.exports = router;


 