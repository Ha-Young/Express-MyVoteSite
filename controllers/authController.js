const User = require('../models/usersModel');
const Voting = require('../models/votingsModel');

exports.renderMainPage = async (req, res, next) => {
  try {
    const votings = await Voting.find();
    console.log(votings, 'in renderMainPage');
    res.render('main', {
      votings,
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
  res.render('auth/login', { err: {} });
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
      console.log(req.session, 'logged in');
      return res.status(302).redirect('/');
    }
    // console.log('login fail');
    return res.status(302).redirect('/login');
  } catch (err) {
    console.log(err, 'err1');
    return res.render('auth/login', { err });
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
