const authorizationUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log('인증됨...', req.session);
    next();
  } else {
    console.log('인증안됨...', req.session);
    res.status(301).redirect('/login');
  }
};

module.exports = authorizationUser;
