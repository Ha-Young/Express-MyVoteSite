const passport = require("passport");
const session = require("express-session");

const User = require("../models/User");

function passportConfig(app) {
  app.use(session(
    {
      secret: process.env.SECCSION_SECRET_KEY,
      resave: true,
      saveUninitialized: false,
    },
  ));

  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = passportConfig;
