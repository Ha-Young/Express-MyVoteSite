const createError = require('http-errors');

const User = require('../../models/User');

exports.validation = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const passwordRules = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/
  const emailRules = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const findUser = await User.findOne({ email });

  // 이미 있는 이메일이면 에러
  if (findUser) {
    next(createError({
      message: '이미 가입된 이메일'
    }));
  }

  // 이메일 유효성 검사
  if (!emailRules.test(email)) {
    next(createError({
      message: '잘못된 이메일 형식'
    }));
  }

  if (password === confirmPassword) {
    if (passwordRules.test(password)) {
      try {
        new User({ email, password }).save();
      } catch (err) {
        next(createError({
          message: '데이터베이스 저장 오류'
        }));
      }
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
