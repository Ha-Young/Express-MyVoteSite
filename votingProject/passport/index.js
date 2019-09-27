const local = require("./localStrategy");
const User = require("../models/User");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });

  passport.deserializeUser((email, done) => {
    User.findOne({ email })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);
};
