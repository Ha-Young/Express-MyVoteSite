const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
    async (accessToken, refreshToken, profile, done) => {
      console.log("ACESS", accessToken)
      try {
        const targetUser = await User.findOne({ email: profile.emails[0].value }).exec();
        if(targetUser) return done(null, targetUser);
        else {
          const newUser = await new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            myAgenda: []
          }).save();
          return done(null, newUser);
        }
      } catch(err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    console.log("serializeUser... objectID", user.id);//session만들기...
    done(null, user.id);
  });

  passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
}
