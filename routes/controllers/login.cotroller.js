const passport = require('passport');

exports.renderLogIn = (req, res, next) => {
  res.status(200).render('login');
};

exports.localLogIn = passport.authenticate('local', {
  successRedirect: '/', failureRedirect: '/login'
});
