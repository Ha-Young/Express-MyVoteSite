const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
},
  (email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }

      if (!user.verifyPassword(password, user.password)) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
