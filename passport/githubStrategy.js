const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User');

module.exports = passport => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.findOne({
        githubId: profile.id,
        provider: 'github'
      });

      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = new User({
          username: profile.username,
          githubId: profile.id,
          provider: 'github'
        });

        const user = await newUser.save();
        done(null, user);
      }
    } catch (error) {
      done(error);
    }
  }));
}
