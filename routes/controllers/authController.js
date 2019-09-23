const passport = require('passport');

exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return next();

  res.status(301).redirect('/login');
};

exports.isNotLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) return res.status(301).redirect('/');

  next();
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  /*req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extendsion: false,
    gmail_remove_subaddress: false,
  });*/
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password-confirm', 'Confirm password is required').notEmpty();
  req.checkBody('password-confirm', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', {titler: 'Register', body: req.body, flashes: req.flash() });
    return;
  }

  next();
};

exports.renderLogin = (req, res) => {
res.render('login');
};
