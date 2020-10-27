const User = require('../../models/User');

exports.renderSignUp = (req, res, next) => {
  return res.render('signup');
};

exports.createUser = async (req, res, next) => {
  const userData = {
    username: req.body.username,
    id: req.body.id,
    password: req.body.password
  };

  try {

    await User.create(userData);

    return res.redirect('/login');
  } catch (err) {
    console.log(err);
  }
};

exports.verifyUser = async (req, res, next) => {
  // console.log('req', req);
  const userData = {
    username: req.body.username,
    id: req.body.id,
    password: req.body.password
  };

  try { // 존재하는 유저인지를 확인하는 것을 middleware에서 처리하는것이 좋은지 아니면 createUser에서 한큐에 해결하는 것이 좋을지?
    const verifyUser = await User.findOne({ id : userData.id });

    if (verifyUser) {
      console.log('유저가 존재합니다.');
      // next(err);
    }

    next();
  } catch (err) {
    console.log(err);
  }
};
