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
    return res.redirect('/');
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
    const exUser = await User.find({ email: req.body.email });
    if (exUser.length !== 0) {
      req.flash('emailDuplicationError', 'The email already exists');
      return res.render('register', {
        title: 'Register',
        message: req.flash('emailDuplicationError')[0]
      });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      name: req.body.username,
      password: hash
    });
    res.redirect('/');
  }catch(error){
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
  }
});

// Logout router
router.get('/logout', (req, res, next) => {
  if(req.session){
    req.session.destroy((err) => {
      if(err){
        return next(err);
      }else{
        return res.redirect('/login');
      }
    });
  }
});

module.exports = router;
