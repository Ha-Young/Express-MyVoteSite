const User = require('../../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 상수 처리

// 메시지 상수 처리
exports.createNewUser = async (req, res, next) => {
  const { email, nickname, password, confirm_password: confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.render('signup', { message: '비밀번호가 일치하지 않습니다. 다시 시도해주세요.' });
    }

    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
      return res.render('signup', { message: '이미 존재하는 이메일입니다. 다른 이메일을 이용해주세요.' });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    await User.create({ email, nickname, password: hash, my_votings: [] });
    next();
  } catch (error) {
    next(error);
  }

  // 이메일 주소 검증
  // 1. 중복 검사
  // 2. 유효성 체크 - @이 들어갔는지 확인
};
