const express = require('express');
const passport = require('passport');
const createError = require('http-errors');
const router = express.Router();
const Poll = require('../models/poll');
const User = require('../models/user');

// const displayVotes = async (req, res, next) => {
//   const users = await User.find({});
//   console.log(users);
//   // const polls = await Poll.find({}).populate('creator')
//   // console.log(polls);
//   // polls.forEach((poll) => {

//   // });
// };


const checkProgress = async (req, res, next) => {
  const polls = await Poll.find({}).populate('creator');
  console.log(polls)
  const timeString = [];
  const promises = polls.map(async (poll) => {
    timeString.push([
      poll.expiringTime.toDateString(), 
      poll.expiringTime.toLocaleTimeString()
    ]);
    if (new Date() > new Date(poll.expiringTime)) {
      const temp = await Poll.findByIdAndUpdate(poll.id, { isInProgress: false });
      return temp;
    }
  });

  await Promise.all(promises);
  // console.log(timeString);
  req.polls = polls;
  req.timeString = timeString;
  next();
  // timeString.push(poll.expiringTime.toDateString());
  // timeString.push(poll.expiringTime.toLocaleTimeString());
  // next();
}



router.get('/', checkProgress, async (req, res, next) => {
  console.log(req);
  // const polls = await Poll.find({}).populate('creator')
  // console.log(polls);
  // const polls = await Poll.find({});
  // console.log(polls);


  if (req.isAuthenticated()) {
    res.render('index', { hasLoggedIn: true, polls: req.polls, timeString: req.timeString });
  } else {
    res.render('index', { hasLoggedIn: false, polls: req.polls, timeString: req.timeString });
  }
});


router.post('/', (req, res, next) => {
  // res.render('index', { title: 'Express' });
});

module.exports = router;
