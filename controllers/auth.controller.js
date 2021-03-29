const Joi = require('joi');
const argon2 = require('argon2');
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

  const { email, name, password, passwordCheck } = req.body;

  const isEmailAlreadyUsed = await User.exists({ email });

  if (isEmailAlreadyUsed) {
    // TODO flash 설정해서 넘기기..!! signup에서도 받을 수 있도록 설정해줘야함.
    console.log('이메일 중복~')
    return res.redirect('/signup');
  } else {
    const passwordHashed = await argon2.hash(password);

    User.create({
      email,
      name,
      password: passwordHashed,
    });

    res.redirect('/login');
  }
}
