const User = require('../models/usersModel');
const Voting = require('../models/votingsModel');

exports.renderMainPage = async (req, res, next) => {
  const votings = await Voting.find();

  res.render('main', {
    data: 'welcome',
    votings,
  });
};

exports.renderSignup = (req, res, next) => {
  res.render('auth/signup');
};

exports.registerUser = async (req, res, next) => {
  try {
    //중복 체크 로직 미들웨어로 뺄수 있을듯?
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    if (password !== passwordConfirm) {
      throw new Error(
        'password and passwordConfirm should be exactly the same'
      );
    }

    const user = await User.findOne({ email });

    if (user) {
      throw new Error('Email is duplicated, use another email');
    }

    const signedUp = await User.create({
      email,
      password,
      passwordConfirm,
    });
    console.log(signedUp, signedUp);

    return res.status(302).redirect('/login');
  } catch (err) {
    res.render('auth/failSignup', { data: err.message });
  }
};

exports.renderLogin = (req, res, next) => {
  res.render('auth/login');
};

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('there is no user using the email');
    }

    const isValid = await user.verifyPassword(password, user.password);

    if (isValid) {
      req.session.user_id = user._id;
      req.session.logined = true;
      return res.status(302).redirect('/');
    }
    return res.status(302).redirect('/login');
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    if (!req.session) {
      throw new Error('session does not exist');
    }

    await req.session.destroy();
    req.sessionID = undefined;

    return res.status(302).redirect('/');
  } catch (err) {
    next(err);
  }
};
