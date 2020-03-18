const User = require("../../models/User");
const SIGNUP_RESULT = { SIGNUP_SUCCESS: "SIGNUP_SUCCESS", USER_EXIST: "USER_EXIST" };
const LOGIN_RESULT = {
  SUCCESS: "SUCCESS",
  NO_ACCOUNT: "NO_ACCOUT",
  WRONG_PASSWORD: "WRONG_PASSWORD",
  ERROR: "ERROR"
};

async function findOrCreateUser(req, res, next) {
  console.log("request here", req.body);
  const { email } = req.body;
  const targetUser = await User.findOne({ email: email });
  if (targetUser) {
    res.json({ message: SIGNUP_RESULT.USER_EXIST });
  } else {
    User.create(req.body);
    res.json({ message: SIGNUP_RESULT.SIGNUP_SUCCESS });
  }
}

async function findUser(req, res, next) {
  const { email, password } = req.body;
  console.log(req.body);
  const targetUser = await User.findOne({ email: email });
  console.log(targetUser);
  if (targetUser) {
    console.log("로그인 로직 시작");
    //비밀번호 비교
    targetUser.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log("오류");
        res.json({ message: LOGIN_RESULT.ERROR });
        return;
      }
      if (isMatch) {
        console.log("통과");
        //세션 처리
        req.session.userId = email.split('@')[0];
        req.session.save(function(){
          res.json({ message: LOGIN_RESULT.SUCCESS });
      });
      } else {
        console.log("비밀번호 오류");
        res.json({ message: LOGIN_RESULT.WRONG_PASSWORD });
      }
    });
  } else {
    console.log("계정없음");
    User.create(req.body);
    res.json({ message: LOGIN_RESULT.NO_ACCOUNT });
  }
}

module.exports = { findOrCreateUser, findUser };
