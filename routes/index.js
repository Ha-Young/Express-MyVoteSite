const express = require('express');
const router = express.Router();

const { validator } = require('../middlewares/validator');
const signupController = require('../controllers/signup.Controller');

const Vote = require('../models/Vote');

// let { title, options, expirationDate } = req.body;
// const { _id, nickname } = req.user;

// options = options.map(option => ({
//   optionTitle: option
// }));

// await Vote.create({
//   title,
//   options,
//   creator: _id,
//   creatorNickname: nickname,
//   expirationDate
// });

// [ { isExpired: false,
//   participants: [],
//   _id: 5e720a57c0fb5d2890576176,
//   title: '짱구',
//   options: [ [Object], [Object], [Object], [Object], [Object] ],
//   creator: 5e716d632095423e188687cf,
//   creatorNickname: '장짱구',
//   expirationDate: 2020-03-26T18:13:00.000Z,
//   __v: 0 },
// { isExpired: false,
//   participants: [],
//   _id: 5e720b40a50b291a682c76f6,
//   title: '징징이',
//   options: [ [Object], [Object], [Object], [Object], [Object] ],
//   creator: 5e716d632095423e188687cf,
//   creatorNickname: '장짱구',
//   expirationDate: 2020-03-19T18:03:00.000Z,
//   __v: 0 } ]

router.get('/', async (req, res, next) => {
  if (req.user) {
    const votes = await Vote.find({}, async (err, vote) => {
      if (vote.expirationDate) {
        await Vote.update({
          id: vote._id
        }, {
          isExpired: true
        });
      }
    });
    res.render('index', { votes });
  } else {
    res.render('index', { votes: null });
  }
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
})

router.post('/signup',
  validator,
  // signupController.passwordConfirmation,
  signupController.register, (req, res, next) => {
    res.redirect('/');
  }
);

module.exports = router;
