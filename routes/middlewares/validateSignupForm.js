const User = require('../../models/User');

async function validateSignupForm(req, res, next) {
  const emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const { email, password, username } = req.body;
  const passwordConfirm = req.body['password-confirm'];

  if (
    !email.match(emailFormat)
    || password.length < 4
    || passwordConfirm.length < 4
    || password !== passwordConfirm
    || !username
  ) {
    res.status(200).render('signupFailure', { message: '형식을 지켜 입력칸을 모두 채우세요' });

    return;
  }

  const emailSearchResult = await User.findOne({ email });

  if (emailSearchResult) {
    res.status(302).render('signupFailure', { message: '이미 가입한 이메일입니다' });

    return;
  }

  next();
};

module.exports = validateSignupForm;
