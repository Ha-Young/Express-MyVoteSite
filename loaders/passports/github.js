const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcrypt');

const SALT = 6;
const RANDOMIZATION = {
  BASE_NUMBER: 16,
};

const initialize = (passport, getUserById, createUser) => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRETS,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    const user = await getUserById(profile.id);

    try {
      if (user) return done(null, profile);

      const temporaryPassword = await makeTemporaryPassword();

      await createUser(profile, temporaryPassword);
      return done(null, profile);
    } catch (e) {
      done(e, null);
    }
  }));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser(async (user, done) => {
    done(null, await getUserById(user.id));
  });
};

async function makeTemporaryPassword() {
  const randomString = Math.random().toString(RANDOMIZATION.BASE_NUMBER).substr(2,11);
  const hash = await bcrypt.hash(randomString, SALT);

  return hash;
}

module.exports = initialize;
