const crypto = require("crypto");
const User = require("../../models/User");

const createUser = async (userInfo) => {
  const { name, email, password } = userInfo;
  const cryptoPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("base64");

  await User.create({ name, email, password: cryptoPassword });
};

module.exports = {
  createUser,
};
