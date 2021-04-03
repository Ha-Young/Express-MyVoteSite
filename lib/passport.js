const passport = require("passport");
const session = require("express-session");

const PASSPORT_SECRET_KEY = require("../constants/passport");

function configureSession(app) {
  app.use(session(
    {
      secret: PASSPORT_SECRET_KEY,
      resave: false,
      saveUninitialized: true
    }
  ));

  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = configureSession;
