const AuthService = require('../../services/AuthService');
const { SERVICE_ERROR_CODE, SUCCESS } = require('../../services/ActionCreator');

exports.getSignUp = function getSignUp(req, res, next) {
  res.status(200).render('signUp');
};

exports.postSignUp = async function postSignUp(req, res, next) {
  const { body } = req;
  try {
    const userInstance = new AuthService(body);
    const { type, payload } = await userInstance.signUp();

    switch (type) {
      case SUCCESS:
        req.session.user = payload;
        req.flash('success', `Welcome, ${payload.name}`);
        return res.redirect('/');
      case SERVICE_ERROR_CODE._00:
        req.flash('error', payload.message);
        return res.redirect('/auth/login');
      default:
        res.redirect('/');
    }
  } catch (error) {
    next(error);
  }
};

exports.getLogin = function getLogin(req, res, next) {
  res.status(200).render('login');
};

exports.postLogin = async function postLogin(req, res, next) {
  const { body, cookies } = req;
  try {
    const userInstance = new AuthService(body);
    const { type, payload } = await userInstance.signIn();

    switch (type) {
      case SERVICE_ERROR_CODE._01:
      case SERVICE_ERROR_CODE._02:
        req.flash('error', payload.message);
        return res.redirect('/auth/login');
      case SUCCESS:
        req.session.user = payload;
        req.flash('success', 'Succeed Login!');
        if (cookies['callback']) {
          res.redirect(cookies['callback']);
        } else {
          res.redirect('/');
        }
        return;
      default:
        res.redirect('/auth/login');
    }
  } catch (error) {
    next(error);
  }
};

exports.getLogout = function getLogout(req, res, next) {
  req.session.destroy();
  res.redirect('/');
};
