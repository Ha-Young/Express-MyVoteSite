const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

passport.use(new LocalStrategy(
  { usernameField : "email" },
  async function (email, password, done) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: "This user has not registered" });
      }

      bcrypt.compare(password, password, user.password, (err, isMatched) => {
        if (err) {
          next(err);
        }

        if (isMatched) {
          return done(null, user);
        } 

        done(null, false, { message: "Password is incorrect" });
      })

    } catch (error) {
      done(error, null);
    }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

module.exports = passport;

