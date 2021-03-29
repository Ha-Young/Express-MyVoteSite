const Joi = require('joi');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerSchema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
  passwordCheck: Joi.string().required().valid(Joi.ref('password')),
});

exports.register = async function (req, res) {
  try {
    await registerSchema.validateAsync(req.body);
  } catch (err) {
    // TODO err message 별로 판단해서 flash 에 넘겨주기..!!
    console.log('joi에 걸림!')
    return res.redirect('/signup');
  }

  const { email, name, password } = req.body;

  const isEmailAlreadyUsed = await User.exists({ email });

  if (isEmailAlreadyUsed) {
    // TODO flash 설정해서 넘기기..!! signup에서도 받을 수 있도록 설정해줘야함.
    console.log('이메일 중복~')
    return res.status(301).redirect('/signup');
  } else {
    const passwordHashed = await argon2.hash(password);

    await User.create({
      email,
      name,
      password: passwordHashed,
    });

    res.status(301).redirect('/login');
  }
}

exports.login = async function (req, res) {
  const { email, password } = req.body;

  const userRecord = await User.findOne({ email });

  if (!userRecord) {
    // TODO flash 설정해서 넘기기..!! login에서도 받을 수 있도록 설정해줘야함.
    // email 없는거임!!
    return res.status(301).redirect('/login');
  }

  const correctPassword = await argon2.verify(userRecord.password, password);

  if (!correctPassword) {
    // TODO flash 설정해서 넘기기..!! login에서도 받을 수 있도록 설정해줘야함.
    // 비밀번호 틀린거임!!
    return res.status(301).redirect('/login');
  }

  res.cookie('token', jwt.sign(
    { id: userRecord._id },
    process.env.JWT_SECRET,
    { expiresIn: '1H'}
  ));
  res.status(301).redirect('/');
}

exports.logout = function (req, res, next) {
  res.clearCookie('token');
  res.status(301). render('/');
}
