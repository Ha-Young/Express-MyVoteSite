const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

exports.join = async(req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (password.match(validPassword)) {
      const existedUser = await User.findOne({ email: email });

      if (existedUser) {
        return res.send({ result: '이미 가입한 회원입니다' });
      }

      const hash = await bcrypt.hash(password, 12);

      await User.create({
        email: email,
        name: username,
        password: hash
      });
      return res.redirect('/');
    }

    return res.render('join', { err: '대문자, 소문자, 숫자 조합하여 7-14자의 비밀번호를 입력 해주세요' })
  } catch(err) {
    next(err);
  }
};

exports.logout = (req, res, err) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};
