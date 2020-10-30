const User = require('../models/usersModel');
const Voting = require('../models/votingsModel');
const { promisify } = require('util');

exports.renderMainPage = async (req, res, next) => {
  try {
    console.log(req.session, 'in renderMainPage');
    const logined = req.session.logined || undefined;
    const votings = await Voting.find();

    res.render('main', {
      votings,
      logined,
    });
  } catch (err) {
    console.log(err, 'renderMainPage');
  }
};

exports.renderSignup = (req, res, next) => {
  try {
    res.render('auth/signup', { err: {} });
  } catch (err) {
    console.log(err, 'renderSignup');
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    //이부분은 ㅂ미들웨어로 빼는게 좋을까요? 뺄려고 하면 다 뺴버릴 수도 있을 것같은데
    //어느정도를 남기고 어느정도를 뺴야할가요?
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

    const signedUp = await User.create({
      email,
      password,
    });

    return res.status(302).redirect('/login');
  } catch (err) {
    console.log(err, 'err in controller');

    // res.render('auth/failSignup', { data: err.message });
    // console.log(err.errors.password.message, 'errs')
    // console.log(err.errors.email.message, 'errs email')
    // console.log(err.errors.passwordConfirm.message, 'errs email')
    return res.render('auth/signup', { err: err.errors });
  }
};

exports.renderLogin = (req, res, next) => {
  console.log(req.session, 'login render');
  const isLogined = req.session.logined || undefined;

  return res.render('auth/login', {
    err: {},
    isLogined,
  });
};

exports.login = async (req, res, next) => {
  console.log(req.session, 'login in controller start');
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
      // const session = { ...req.session };
      // session.user_id = user._id;
      // session.logined = true;
      // const test = await req.sessionStore.set(req.session._id, session);
      // console.log(test, 'tses');
      req.session.user_id = user._id;
      req.session.logined = true;
      await new Promise((resolve) => req.session.save(() => resolve()));

      if (req.session.redirectUrl) {
        console.log(req.session.id, 'logged when redirect exist');
        return res.status(302).redirect(`${req.session.redirectUrl}`);
      }
      console.log(req.session, 'logged without redirect');
      return res.status(302).redirect('/');
    }

    return res.status(302).redirect('/login');
  } catch (err) {
    console.log(err, 'err1');
    return res.render('auth/login', { err });
  }
};

exports.logout = async (req, res, next) => {
  try {
    console.log(req.session, 'in log out start');

    if (!req.session) {
      throw new Error('session does not exist');
    }
    // console.log(req.session, 'in log out2');
    // delete req.session;
    // await req.sessionStore.destroy(req.sessionID);
    // req.sessionID = undefined;

    await new Promise((resolve) => req.session.destroy(() => resolve()));
    // await req.session.destroy();
    // console.log(test, 'promisify in logout');

    // console.log(req.sessionID, 'in log out after destroy');

    return res.status(302).redirect('/');
  } catch (err) {
    next(err);
  }
};
