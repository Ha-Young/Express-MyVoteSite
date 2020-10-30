const AuthService = require('../../services/AuthService');
const { SERVICE_ERROR_CODE } = require('../../services/ActionCreator');
const {
  ROUTES,
  ROUTE_AUTH,
  VIEWS,
  SUCCESS,
  ERROR,
  CALLBACK_URI
} = require('../../config/constants');

exports.getSignUp = function getSignUp(req, res, next) {
  res.status(200).render(VIEWS.SIGN_UP);
};

exports.postSignUp = async function postSignUp(req, res, next) {
  const { body } = req;
  try {
    const userInstance = new AuthService(body);
    const { type, payload } = await userInstance.signUp();

    switch (type) {
      case SERVICE_ERROR_CODE._00:
        req.flash(ERROR, payload.message);
        return res.redirect(ROUTES.AUTH + ROUTE_AUTH.LOGIN);
      case SUCCESS:
        req.session.user = payload;
        req.flash(SUCCESS, `Succeed Sign up! Welcome, ${payload.name}`);
      default:
        res.redirect(ROUTES.HOME);
    }
  } catch (error) {
    next(error);
  }
};

exports.getLogin = function getLogin(req, res, next) {
  res.status(200).render(VIEWS.LOGIN);
};

exports.postLogin = async function postLogin(req, res, next) {
  const { body, cookies } = req;
  try {
    const userInstance = new AuthService(body);
    const { type, payload } = await userInstance.signIn();

    switch (type) {
      case SERVICE_ERROR_CODE._01:
      case SERVICE_ERROR_CODE._02:
        req.flash(ERROR, payload.message);
        return res.redirect(ROUTES.AUTH + ROUTE_AUTH.LOGIN);
      case SUCCESS:
        req.session.user = payload;
        req.flash(SUCCESS, 'Succeed Login!');
        if (cookies[CALLBACK_URI]) {
          res.redirect(cookies[CALLBACK_URI]);
        } else {
          res.redirect(ROUTES.HOME);
        }
        return;
      default:
        res.redirect(ROUTES.AUTH + ROUTE_AUTH.LOGIN);
    }
  } catch (error) {
    next(error);
  }
};

exports.getLogout = function getLogout(req, res, next) {
  req.session.destroy();
  res.redirect('/');
};
