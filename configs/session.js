const session = require('express-session');

const ONE_DAY = 24 * 60 * 60 * 1000;

module.exports = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: ONE_DAY,
  },
});
