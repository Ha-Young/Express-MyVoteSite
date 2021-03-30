const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { rootURL, google: { googleClientId, googleSecret } } = require("../config");
const { LOGIN_GOOGLE_REDIRECT } = require("../config/routes").AUTH;

module.exports = ({ app }) => {
  app.use(passport.initialize());

  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleSecret,
        callbackURL: `${rootURL}${LOGIN_GOOGLE_REDIRECT}`,
      },
      function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
    )
  );
};
