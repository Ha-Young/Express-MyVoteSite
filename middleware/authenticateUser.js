const authenticateUser = (req, res, next) => {
  const user = req.session.user;

  if (req.method === 'PUT') {
    if (user) {
      return next();
    } else {
      return res.json({ result: 'fail', redirectUrl: '/login', });
    }
  }

  if (user) {
    next();
  } else {
    req.session.beforeUrl = req.originalUrl;
    req.session.save((err) => {
      if (err) next (err);

      res.redirect('/login');
    });
  }
};

module.exports = authenticateUser;
