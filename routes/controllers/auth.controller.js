const AuthService = require('../../services/AuthService');
const { SERVICE_ERROR_CODE } = require('../../services/ActionCreator');
const {
  ROUTES,
  ROUTE_AUTH,
  VIEWS,
  MESSAGES,
  SUCCESS,
  ERROR,
  CALLBACK_URI
} = require('../../config/constants');

exports.renderSignUp = function renderSignUp(req, res, next) {
  res.status(200).render(VIEWS.SIGN_UP);
};

exports.signUpUser = async function signUpUser(req, res, next) {
  const { body } = req;
  try {
    const userInstance = new AuthService(body);
    const { status, payload } = await userInstance.signUp();

    switch (status) {
      case SERVICE_ERROR_CODE._00:
        req.flash(ERROR, payload.message);
        return res.redirect(ROUTES.AUTH + ROUTE_AUTH.LOGIN);
      case SUCCESS:
        req.session.user = payload;
        req.flash(SUCCESS, `${MESSAGES.SUCCESS_SIGNUP} ${payload.name}`);
      default:
        res.redirect(ROUTES.HOME);
    }
  } catch (error) {
    next(error);
  }
};

exports.renderLogin = function renderLogin(req, res, next) {
  res.status(200).render(VIEWS.LOGIN);
};

exports.loginUser = async function loginUser(req, res, next) {
  const { body, cookies } = req;
  try {
    const userInstance = new AuthService(body);
    const { status, payload } = await userInstance.signIn();

    switch (status) {
      case SERVICE_ERROR_CODE._01:
      case SERVICE_ERROR_CODE._02:
        req.flash(ERROR, payload.message);
        return res.redirect(ROUTES.AUTH + ROUTE_AUTH.LOGIN);
      case SUCCESS:
        req.session.user = payload;
        req.flash(SUCCESS, MESSAGES.SUCCESS_LOGIN);
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

exports.logoutUser = function logoutUser(req, res, next) {
  req.session.destroy();
  res.redirect(ROUTES.HOME);
};
