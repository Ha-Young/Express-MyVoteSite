const AuthService = require('../services/AuthService');

const authService = new AuthService();

const getSignUpPage = (req, res, next) => {
  res.render('signup');
};

const signUpUser = async (req, res, next) => {
  try {
    const { email, password, nickname, } = req.body;

    let user = null;

    try {
      user = await authService.signUpUser({ email, password, nickname, });
    } catch (err) {
      res.locals.message = err.message;
      return res.render('signup');
    }

    const { _id, } = user;
    req.session.user = { id: _id.toString(), email, nickname, };
    req.session.save((err) => {
      if (err) throw Error(err);

      res.redirect('signup/success');
    });
  } catch (err) {
    console.error('🔥 controller: signup -> signUpUser', err);
    next(err);
  }
};

const getSuccessPage = (req, res, next) => {
  res.render('signup/success');
};

module.exports = {
  getSignUpPage,
  signUpUser,
  getSuccessPage,
};
