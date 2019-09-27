const passport = require('passport');
const User = require('../../models/User');
const regExp = require('../../constants/reg-exp');

exports.login = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
});

exports.join = async function(req, res, next) {
  try {
    const { email, username, password, confirm_password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      return res.render('join', { message: '이미 가입한 회원입니다', err: null });
    }

    if (!regExp.vaildEmail.test(email)) {
      return res.render('join', { message: '이메일 형식이 맞지 않습니다', err: null });
    }

    if (regExp.vaildPassword.test(password)) {
      if (password !== confirm_password) {
        return res.render('join', { message: '비밀번호가 일치하지 않습니다', err: null });
      }

      const newUser = await new User({
        email: email,
        name: username,
        password: password
      });

      newUser.validate(function(err) {
        return res.render('join', { message: err, err: null });
      });

      await newUser.save();
      return res.redirect('/');
    }

    res.render('join', { message: null, err: true });
  } catch(err) {
    next(err);
  }
};

exports.logout = function(req, res, err) {
  req.logout();
  req.session.destroy();
  res.redirect('/');
};
