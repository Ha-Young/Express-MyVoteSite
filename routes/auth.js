const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const passport = require('passport');
const bcrypt = require('bcrypt');


// Login router

router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Log In',
    message: req.flash('loginError')
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if(authError){
      return next(authError);
    }
    if(!user){
      req.flash('loginError', info.message);
      return res.redirect('/login');
    }

    req.login(user, (err) => {
      return res.redirect('/');
    });
  })(req, res, next);
});


// Register router

router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Register',
    message: null
  });
});

router.post('/register', async(req, res, next) => {
  try{
    const exUser = await User.findOne({ email: req.body.email });
    if(exUser){
      req.flash('DuplicateEmailError', 'The email already exists');
      return res.render('register', {
        title: 'Register',
        message: req.flash('DuplicateEmailError')[0]
      });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      name: req.body.username,
      password: hash
    });
    res.redirect('/auth/login');
  }catch{
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
  }
});


// Logout router

router.get('/logout', (req, res, next) => {
  if(req.session){
    req.logout();
    req.session.destroy();
    res.redirect('/auth/login');
  }
});

module.exports = router;
