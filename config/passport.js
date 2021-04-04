const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

passport.use(new LocalStrategy(
  { usernameField : "email" ,
    passwordField: "password",
    passReqToCallback: true,
  },
  async function (req, email, password, done) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, req.flash("loginMessage", "This user has not registered"));
      }

      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        return done(null, false, req.flash("loginMessage", "Password is incorrect"));
      }

      return done(null, user);
    }
    catch (error) {
      done(error, null);
    };
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

module.exports = passport;
