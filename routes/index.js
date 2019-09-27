const router = require('express').Router();
const { authCheck, saveSession } = require('./middlewares/auth');
const User = require('../models/User');
const Voting = require('../models/Voting');

router.get('/', authCheck, async (req, res, next) => {
  const votings = await Voting.find();
  const allVotings = await Promise.all(votings.map(async (voting) => {
    const user = await User.findOne({ _id: voting.creator_id });
    const userName = user.email;
    const current = new Date();
    let status = 'Open';
    if (current > voting.expireDate) status = 'Closed';

    return {
      _id: voting._id,
      creator: userName,
      title: voting.title,
      expire: voting.expireDate,
      status
    };
  }));

  res.render('index', { title: 'Welcome to Vote', allVotings });
});

router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Welcome to Vote',
    message: ''
  });
});

router.post('/login', (req, res, next) => {
  try {
    User.authenticate(req.body.email,
      req.body.password,
      (err, user) => {
        if (err) {
          res.render('login', {
            title: 'Welcome to Vote',
            message: 'Invalid email or password'
          });
        } else {
          saveSession(err, user, req, res, next);
          res.redirect('/');
        }
      }
    );
  } catch(err) {
    next(err);
  }
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        next(err);
      } else {
        res.status(200).render('success', {
          title: 'Vote',
          message: 'You have logged-out!'
        });
      }
    });
  }
});

module.exports = router;
