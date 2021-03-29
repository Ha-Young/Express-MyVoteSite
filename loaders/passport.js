const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

function initialize() {
  passport.serializeUser((user, done) => {
    // TODO: user => user.id
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    // TODO: find user by id
    done(null, user);
  });
  
  function authenticateUser(accessToken, refreshToken, profile, done) {
    try {
      // const user = await User.findOne({ email });
  
      // if (!user) {
      //   return done(null, false, { message: "unknown email" });
      // }
  
      return done(null, profile);
    } catch (error) {
      return done(error);
    }
  }
  
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback",
  }, authenticateUser));
}

module.exports = initialize;
