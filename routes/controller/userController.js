const User = require("../../models/User");
const SIGNUP_RESULT = { SIGNUP_SUCCESS: "SIGNUP_SUCCESS", USER_EXIST: "USER_EXIST" };
const LOGIN_RESULT = {
  SUCCESS: "SUCCESS",
  NO_ACCOUNT: "NO_ACCOUT",
  WRONG_PASSWORD: "WRONG_PASSWORD",
  ERROR: "ERROR"
};


async function findOrCreateUser(req, res, next) {
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
  const targetUser = await User.findOne({ email: email });
  if (targetUser) {
    targetUser.comparePassword(password, function(err, isMatch) {
      if (err) {
        res.json({ message: LOGIN_RESULT.ERROR });
        return;
      }
      if (isMatch) {
        req.session.user=targetUser;
        req.session.userId = email.split("@")[0];
        req.session.save(function() {
          res.json({ message: LOGIN_RESULT.SUCCESS });
        });
      } else {
        res.json({ message: LOGIN_RESULT.WRONG_PASSWORD });
      }
    });
  } else {
    User.create(req.body);
    res.json({ message: LOGIN_RESULT.NO_ACCOUNT });
  }
}

module.exports = { findOrCreateUser, findUser };
