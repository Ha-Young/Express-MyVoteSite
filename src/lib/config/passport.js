import passport from 'passport';
import User from '../../models/User';

export default () => {
  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
