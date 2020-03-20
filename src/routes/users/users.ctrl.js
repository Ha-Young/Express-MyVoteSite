import createError from 'http-errors';
import passport from 'passport';
import Joi from '@hapi/joi';
import { ALREADY_EXISTING_USER_MESSAGE } from '../../lib/constants';
import User from '../../models/User';

export const renderLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

export const login = passport.authenticate('local', {
  failureRedirect: '/users/login',
  failureFlash: true
});

export const loginCallback = async (req, res, next) => {
  if (!req.session.redirectUrl) return res.redirect(302, '/');

  try {
    const { redirectUrl } = req.session;
    delete req.session.redirectUrl;
    await req.session.save();

    res.redirect(302, redirectUrl);
  } catch (e) {
    next(createError(500));
  }
};

export const renderSignup = (req, res) => {
  res.render('signup', { title: 'Signup' });
};

export const signup = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().alphanum().min(8).max(20),
    confirmation: Joi.ref('password')
  }).with('password', 'confirmation');

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    req.flash('error', validationResult.error.details[0].message);
    return res.redirect(302, '/users/signup');
  }

  try {
    const { email, password } = req.body;
    const existingUser = await User.findByUsername(email);

    if (existingUser) {
      req.flash('error', ALREADY_EXISTING_USER_MESSAGE);
      return res.redirect(302, '/users/signup');
    }

    const newUser = await User({ email });
    await User.register(newUser, password);

    res.redirect(302, '/users/login');
  } catch (e) {
    next(createError(500));
  }
};

export const logout = (req, res) => {
  req.logout();
  req.session.destroy();

  res.redirect(302, '/');
};
