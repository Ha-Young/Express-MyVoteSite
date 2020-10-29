const AuthService = require('../services/AuthService');

const authService = new AuthService();

const getLoginPage = (req, res, next) => {
  res.render('login');
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password, } = req.body;

    const user = await authService.loginUser({ email, password, }, (err) => {
      if (err) {
        res.locals.message = err.message;
        return res.render('login');
      }
    });

    const { _id, nickname, } = user;
    req.session.user = { id: _id.toString(), email, nickname, };
    req.session.save((err) => {
      if (err) throw Error(err);

      const beforeUrl = req.session.beforeUrl;

      if (beforeUrl) {
        res.redirect(beforeUrl);
      } else {
        res.redirect('/');
      }
    });
  } catch (err) {
    console.error('🔥 controller: login -> loginUser', err);
    next(err);
  }
};

module.exports = {
  getLoginPage,
  loginUser,
};
