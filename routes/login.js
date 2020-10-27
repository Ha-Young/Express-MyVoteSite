const express = require('express');
const User = require('../models/User');
const router = express.Router();
const passport = require('../src/passport');

router.use(require('flash')());

router.get('/', (req, res, next) => {
  res.status(200).render('login');
});

router.post('/', (req, res, next) => {
  try {
    console.log('???');
    User.authenticate(req.body.email, req.body.password, (err, user) => {
      if (!user) {
        res.status(200).render('wrongIdOrPw');

        return;
      }

      req.session.userId = user._id;
      res.status(302).redirect('/');
    });
  } catch (err) {
    const error = new Error('Wrong email or password');
    error.status = 401;
    next(error);
  }
});

// router.post('/',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true,
//   })
// );

module.exports = router;
