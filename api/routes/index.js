const express = require('express');
const passport = require('passport');
const UserService = require('../../services/UserService');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('home');
});

router.get('/expired', (req, res, next) => {
  res.render('expired')
});

router.get('/my-votings', (req, res, next) => {
  res.render('myVotings')
});


router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', async (req, res, next) => {
  const user = req.body;

  try {
    const result = await UserService.signup(user);

    if (result) return res.json({ redirect: '/login' });
    return res.json({ signupResult: 'Email Already Exist' });
  } catch (error) {
    next(error); //500 interal error
  }

});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

router.get('/logout', (req, res, next) => {
  res.render('logout');
});

module.exports = router;
