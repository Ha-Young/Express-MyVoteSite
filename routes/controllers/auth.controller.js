const AuthService = require('../../services/AuthService');

exports.getSignUp = function getSignUp(req, res, next) {
  res.status(200).render('signup');
};

exports.postSignUp = async function postSignUp(req, res, next) {
  const { body } = req;
  try {
    const userInstance = new AuthService(body);
    const { type, payload } = await userInstance.signUp();

    switch (type) {
      case 'succeed':
        req.session.user = payload;
        return res.redirect('/');
      case 'failed-password-confirm':
        return res.redirect('/auth/signup');
      case 'failed-user-exists':
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
      case 'failed-no-user':
      case 'failed-password-mismatch':
        return res.redirect('/auth/login');
      case 'success':
        req.session.user = payload;
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
