const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/login', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('login', { hasLoggedIn: true });
  } else {
    res.render('login', { hasLoggedIn: false });
  }
});


// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failWithError: true,
}));

router.get('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/');
});



  // try {
  //   const { email }  = req.body;
  //   const { password } = req.body;
  //   const user = await User.findOne({ email });
  //   const id = user.id;
  //   if (user) {
  //     const isPasswordCorrect = await bcrypt.compare(password, user.password);
  //     if (isPasswordCorrect) {

     
  //     }
  //     console.log('incorrect')
  //   } else {
      
  //   }
  // } catch(e) {
  //   next(e);
  // }
 
// });

// router.post('/login', async (req, res, next) => {
//   const { email }  = req.body;
//   const user = await User.findOne({ email });
// });

module.exports = router;

   // const token = jwt.sign({ email, id }, process.env.JWT_KEY, { expiresIn: "1h" });
        // res.cookie('access_token' , { token });
        // res.status(200).end();