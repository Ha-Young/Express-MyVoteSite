const GitHubStrategy = require('passport-github2').Strategy;

const initialize = (passport, getUserByEmail, createUser) => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRETS,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    const user = await getUserByEmail(profile.id);

    try {
      if (user) return done(null, profile);

      await createUser(profile);
      return done(null, profile);
    } catch (e) {
      next(e);
    }
  }));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser(async (user, done) => {
    done(null, await getUserByEmail(user.id));
  });
};

module.exports = initialize;
