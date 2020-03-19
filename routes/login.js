const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  console.log(req.header("referer"));
  console.log(req.header("referer") === 'http://localhost:3000/votings/*')
  console.log(123);
  res.render('login');
});

router.post('/auth', (req, res, next) => {
  const referer = req.header("referer")
  console.log(referer.split('/')[3]);
  const sucessURL = referer.split('/')[3] === 'votings' ? referer.slice(21) : '/';
  console.log(sucessURL);
  passport.authenticate('local', {
    successRedirect: sucessURL,
    failureRedirect: '/login'
  })(req,res,next);
});

// router.post("/login",function(req,res,next){
//   var redirect= req.query.returnUrl || "index";
//   passport.authenticate('local', {
//     successRedirect: redirect,
//     failureRedirect: 'login',
//     failureFlash: true })(req,res,next);
// });

// router.post('/auth', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login'
// }));

module.exports = router;
