const User = require("../../models/User");
const SIGNUP_RESULT={ SIGNUP_SUCCESS:'SIGNUP_SUCCESS' , USER_EXIST:"USER_EXIST" }

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

module.exports = { findOrCreateUser };
