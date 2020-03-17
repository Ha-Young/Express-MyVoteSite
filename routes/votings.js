const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
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
  if (req.isAuthenticated()) {
    const { topic } = req.body;
    const id = req.session.passport.user;
    const answers = Object.values(req.body);
    answers.shift();
    const poll = await new Poll({ topic, creator: id }).save();
    const user = await User.findById(id);
    user.myPolls.push(poll.id);
    answers.forEach((answer) => {
      poll.answers.push({ answer })
    });
    
    console.log(poll);
    console.log(user);

    // const user = await User.findById(id);
    // const user = await User.findById(id);
  
    // console.log(ss);
    // console.log(user)
    // console.log(poll.id);



    
    // console.log(poll.answers);
    // console.log(poll)


    // const ss = await Poll.findOne({ _id: poll._id }).populate('creator');
    // console.log(ss);

    // console.log(req.session.passport.user)
    // console.log(id)
    // const poll = new Poll({ })
    // const user = await User.findOne( { email: 'arada3211@gmail.com' } );
    // console.log(user);
  }
  // pusher.trigger('poll', 'vote', {
  //   votes: 1,
  //   poll: req.body.poll
  // });
});

module.exports = router;
