const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// TODO 여기랑 라우터 이름 signup으로 바꿔야할듯?
exports.register = async function (req, res) {
  const { email, name, password } = req.body;

  // TODO error handling
  const isEmailAlreadyUsed = await User.exists({ email });

  if (isEmailAlreadyUsed) {
    // TODO flash 설정해서 넘기기..!! signup에서도 받을 수 있도록 설정해줘야함.
    console.log('이메일 중복~')
    return res.status(301).redirect('/signup');
  } else {
    const hashedPassword = await argon2.hash(password);

    await User.create({
      email,
      name,
      password: hashedPassword,
    });

    res.status(301).redirect('/login');
  }
};

exports.login = async function (req, res) {
  const { email, password } = req.body;
  const currentUser = await User.findOne({ email }).lean();

  if (!currentUser) {
    // TODO flash 설정해서 넘기기..!! login에서도 받을 수 있도록 설정해줘야함.
    // email 없는거임!!
    return res.status(301).redirect('/login');
  }

  const correctPassword = await argon2.verify(currentUser.password, password);

  if (!correctPassword) {
    // TODO flash 설정해서 넘기기..!! login에서도 받을 수 있도록 설정해줘야함.
    // 비밀번호 틀린거임!!
    return res.status(301).redirect('/login');
  }

  res.cookie('access_token', jwt.sign(
    { id: currentUser._id },
    process.env.JWT_SECRET,
    { expiresIn: '2H'}
  ));

  if (req.cookies.prev_page) {
    res.clearCookie('prev_page');
    return res.status(301).redirect(req.cookies.prev_page);
  }

  res.status(301).redirect('/');
};
