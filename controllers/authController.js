import passport from 'passport';
import createError from 'http-errors';
import User from '../models/user';

export const getLogin = (req, res) => {
  const { redirect_id: id } = req.query;

  res.render('login', { id });
};

export const postLogin = (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      next(createError(500, err));
    }

    if (!user) {
      return res.redirect('/login');
    }

    req.logIn(user, (err) => {
      if (err) {
        next(createError(500, err));
      }

      const { redirect_id: id } = req.query;

      if (id) {
        res.redirect(`/votings/${id}`);
      } else {
        res.redirect('/');
      }
    });
  })(req, res);
}


passport.authenticate('local', (req, res) => {
  const { redirect_id: id } = req.query;

  if (id) {
    res.redirect(`/votings/${id}`);
  } else {
    res.redirect('/');
  }
});

export const getSignup = (req, res) => {
  res.render('signup');
};

export const postSignup = async (req, res) => {
  const {
    username,
    email,
    password,
    password2
  } = req.body;

  if (password !== password2) {
    next(createError(400, 'Password is not Matched'));
  } else {
    try {
      const user = new User({
        username,
        email
      });

      await User.register(user, password);
      res.redirect('/login');
    } catch (err) {
      next(createError(500, err));
    }
  }
};

export const getLogout = (req, res) => {
  req.logout();
  res.redirect('/');
};
