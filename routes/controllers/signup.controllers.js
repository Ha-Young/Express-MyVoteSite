const createError = require('http-errors');
const crypto = require('crypto');

const User = require('../../models/User');

exports.validation = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const passwordRules = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/
  const emailRules = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const findUser = await User.findOne({ email });
  if (findUser) {
    next(createError({
      message: '이미 가입된 이메일'
    }));
  }

  if (!emailRules.test(email)) {
    next(createError({
      message: '잘못된 이메일 형식'
    }));
  }

  if (password === confirmPassword) {
    if (passwordRules.test(password)) {
      crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(password, buf.toString('base64'), 14282, 64, 'sha512', (err, key) => {
          try {
            new User({
              email,
              password: key.toString('base64'),
              salt: buf.toString('base64')
            }).save();
            res.redirect('/login');
          } catch (err) {
            next(createError({
              message: '데이터베이스 저장 오류'
            }));
          }
        });
      });
    } else {
      next(createError({
        message: '6 ~ 12 자리 숫자, 문자 혼합해서 입력 해주세요'
      }));
    }

  } else {
    next(createError({
      message: '두 비밀번호 다름'
    }));
  }
};
