const User = require('../../models/usersModel');
const Voting = require('../../models/votingsModel');

exports.renderMainPage = async (req, res, next) => {
  try {
    const logined = req.session.logined || undefined;
    const votings = await Voting.find();

    res.render('main', {
      votings,
      logined,
    });
  } catch (err) {
    next(err);
  }
};

exports.renderSignup = (req, res, next) => {
  try {
    res.render('auth/signup', { err: {} });
  } catch (err) {
    next(err);
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    if (password !== passwordConfirm) {
      const err = new Error(
        'Please input the same password in both password and password confirm.'
      );
      err.errors = { passwordConfirm: { message: err.message } };
      throw err;
    }

    await User.create({
      email,
      password,
    });

    return res.status(302).redirect('/login');
  } catch (err) {
    return res.render('auth/signup', { err: err.errors });
  }
};

exports.renderLogin = (req, res, next) => {
  const isLogined = req.session.logined || undefined;

  return res.render('auth/login', {
    err: {},
    isLogined,
  });
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });

    if (!user) {
      const err = new Error('The given email address does not exist.');
      err.email = { message: err.message };
      throw err;
    }

    const isValid = await user.verifyPassword(password, user.password);

    if (isValid) {
      req.session.user_id = user._id;
      req.session.logined = true;
      await new Promise((resolve) => req.session.save(() => resolve()));

      if (req.session.redirectUrl) {
        return res.status(302).redirect(`${req.session.redirectUrl}`);
      }
      return res.status(302).redirect('/');
    }

    return res.status(302).redirect('/login');
  } catch (err) {
    return res.render('auth/login', { err, isLogined: false });
  }
};

exports.logout = async (req, res, next) => {
  try {
    if (!req.session) {
      throw new Error('session does not exist');
    }

    await new Promise((resolve) => req.session.destroy(() => resolve()));

    return res.status(302).redirect('/');
  } catch (err) {
    next(err);
  }
};
