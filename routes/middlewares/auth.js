const session = require('express-session');

exports.setSession = app => {
  app.use(session({
    secret: process.env.SECRETE,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 600 * 60 * 24 * 7 }
  }));
};

exports.saveSession = (err, user, req, res, next) => {
  if (err) {
    next(err);
  } else {
    req.session.userId = user._id;
  }
};

exports.authCheck = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
};
