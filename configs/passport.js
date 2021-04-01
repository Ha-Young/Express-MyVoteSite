const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
},
  (email, password, done) => {
    User.findOne({ email }, async (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { message: "가입하지 않은 이메일입니다" });
      }

      if (!await user.verifyPassword(password, user.password)) {
        return done(null, false, { message: "잘못된 비밀번호입니다" });
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
