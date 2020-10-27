const passport = require('passport');

exports.renderLogIn = (req, res, next) => {
  res.render('login');
};

exports.localLogIn = passport.authenticate('local', {
  successRedirect: '/', failureRedirect: '/login'
});
