const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const User = require('../models/User');

function initialize() {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      // TODO: flash or error page.
      console.error(error);
    }
  });

  async function authenticateUser(accessToken, refreshToken, profile, done) {
    const { email, login: name, avatar_url: avatarUrl, id: githubId } = profile._json;

    try {
      const user = await User.findOrCreate({
        email,
        name,
        avatarUrl,
        githubId,
      });

      return done(null, user.doc);
    } catch (error) {
      // TODO: flash or error page.
      return done(error);
    }
  }

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback',
  }, authenticateUser));
}

module.exports = initialize;
