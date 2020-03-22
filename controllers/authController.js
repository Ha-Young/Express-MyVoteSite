import mongoose from 'mongoose';
import passport from 'passport';
import createError from 'http-errors';
import User from '../models/user';

export const getLogin = (req, res) => {
  const { redirect_vote_id: id } = req.query;

  res.render('login', { id });
};

export const postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
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

      const { redirect_vote_id: id } = req.query;

      if (id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          next(createError(400, '잘못된 요청입니다.'));
          return;
        }

        res.redirect(`/votings/${id}`);
      } else {
        res.redirect('/');
      }
    });
  })(req, res);
};

export const getSignup = (req, res) => {
  res.render('signup');
};

export const postSignup = async (req, res, next) => {
  const {
    username,
    email,
    password,
    confirmPassword
  } = req.body;

  if (
    !username.trim().length ||
    !email.trim().length ||
    !password.trim().length ||
    !(password === confirmPassword)
  ){
    const err = new mongoose.Error.ValidationError();

    next(createError(400, err));
    return;
  }

  try {
    const user = new User({
      username,
      email
    });

    await User.register(user, password);
    res.redirect('/login');
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(createError(400, err));
      return;
    }

    next(createError(500, err));
  }
};

export const getLogout = (req, res) => {
  req.logout();
  res.redirect('/');
};
