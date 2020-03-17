import passport from 'passport';
import User from '../models/user';

export const getLogin = (req, res) => {
  res.render('login');
};

export const postLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});

export const getSignup = (req, res) => {
  res.render('signup');
};

export const postSignup = async (req, res, next) => {
  const { username, email, password, password2 } = req.body;

  if (password !== password2) {
    res.send('Password is not Matched');
  } else {
    try {
      const user = new User({
        username,
        email
      });

      await User.register(user, password);
      next();
    } catch (err) {
      // Error handling
      res.redirect('/');
    }
  }
};

export const getLogout = (req, res) => {
  req.logout();
  res.redirect('/');
}
