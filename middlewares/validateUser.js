const User = require("../model/User");

const validateUser = async (req, res, next) => {
  if (await User.exists({ email: req.body.email })) {
    return res.send(400, "이미 가입된 사용자입니다");
  }

  next();
};

module.exports = validateUser;
