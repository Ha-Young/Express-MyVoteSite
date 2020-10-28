const User = require('../models/usersModel');
const Voting = require('../models/votingsModel');
const { PASSWORD } = require('../constants/error');

exports.renderMainPage = async (req, res, next) => {
  const votings = await Voting.find();

  res.render('main', {
    votings,
  });
};

exports.renderSignup = (req, res, next) => {
  res.render('auth/signup', { err: {} });
};

exports.registerUser = async (req, res, next) => {
  try {
    //중복 체크 로직 미들웨어로 뺄수 있을듯?
    const email = req.body.email;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    if (password !== passwordConfirm) {
      const err = new Error(
        'Please input the same password in both password and password confirm.'
      );
      err.errors = { passwordConfirm: { message: err.message } }
      throw err
    }

    // const user = await User.findOne({ email });

    // if (user) {
    //   throw new Error('Email is duplicated, use another email');
    // }

    const signedUp = await User.create({
      email,
      password,
    });
    return res.status(302).redirect('/login');
  } catch (err) {
    console.log('err')
    // res.render('auth/failSignup', { data: err.message });
    // console.log(err, 'err')
    // console.log(err.errors.password.message, 'errs')
    // console.log(err.errors.email.message, 'errs email')
    // console.log(err.errors.passwordConfirm.message, 'errs email')
    return res.render('auth/signup', { err: err.errors })

  }
};

exports.renderLogin = (req, res, next) => {
  console.log('called by put method');
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
      // console.log('login sucess');
      req.session.user_id = user._id;
      req.session.logined = true;
      return res.status(302).redirect('/');
    }
    // console.log('login fail');
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
