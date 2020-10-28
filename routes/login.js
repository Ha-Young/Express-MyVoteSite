const express = require('express');
const router = express.Router();
const loginController = require('./controllers/login.controller');
const passport = require('passport');

router.get('/', loginController.renderLogin);
router.post('/', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    var redirectUrl = '/'

    if (!user) { return res.redirect('/login'); }
    if (req.session.redirectUrl) {
      redirectUrl = req.session.redirectUrl;
      req.session.redirectUrl = null;
    }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
    });
    return res.redirect(redirectUrl);
  })(req, res, next);
});

module.exports = router;


// {
//     successRedirect: '/',
//     failureRedirect: '/login'
// }