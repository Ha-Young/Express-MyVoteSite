exports.renderLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('login', { hasLoggedIn: true });
  } else {
    res.render('login', { hasLoggedIn: false });
  }
};

exports.authAndRedirect = (req, res, next) => {
  res.redirect(req.session.returnTo || '/');
  delete req.session.returnTo;
};

exports.logOut = (req, res, next) => {
  req.logOut();
  req.session.destroy();
  res.redirect('/');
};
