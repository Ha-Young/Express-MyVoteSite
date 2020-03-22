const createError = require('http-errors');
const crypto = require('crypto');

const User = require('../../models/User');

exports.validation = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const signupInfo = Object.keys(req.body);
  const isEmptyValueCheck = signupInfo.every(item => req.body[item].length !== 0);
  console.log(email, password, confirmPassword)

  const passwordRules = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
  const emailRules = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!isEmptyValueCheck) {
    next(createError(409, {
      message: '빈 값을 제출할 수 없습니다'
    }));
    return
  }

  try {
    const findUser = await User.findOne({ email });

    if (findUser) {
      next(createError(409, {
        message: '이미 가입된 이메일 입니다'
      }));
      return
    }

    if (!emailRules.test(email)) {
      next(createError(409, {
        message: '잘못된 이메일 형식 입니다'
      }));
      return
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
                message: '회원가입이 실패 했습니다'
              }));
              return
            }
          });
        });
      } else {
        next(createError(409, {
          message: '비밀번호를 6 ~ 12 자리 숫자, 문자 혼합해서 입력 해주세요'
        }));
        return
      }

    } else {
      next(createError(409, {
        message: '두 비밀번호가 다릅니다.'
      }));
      return
    }
  } catch (err) {
    next(createError({
      message: '회원가입중에 에러가 발생했습니다'
    }));
  }
};
