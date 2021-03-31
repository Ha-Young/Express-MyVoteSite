const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

function initialize() {
  async function authenticateUser(email, password, done) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: "unknown email" });
      }

      const hasUser = await bcrypt.compare(password, user.password);

      if (hasUser) {
        return done(null, user);
      }

      return done(null, false, { message: "wrong password" });
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy({
    usernameField: "email",
  }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      return done(null, await User.findById(id));
    } catch (error) {
      return done(error, null, { message: "Error failed to find user" });
    }
  });
}

module.exports = initialize;
