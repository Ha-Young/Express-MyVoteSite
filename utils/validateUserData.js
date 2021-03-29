const User = require("../models/User");

module.exports = async (user) => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (user.name.length > 20) {
    return {
      result: false,
      message: "Name must be 20 characters or less.",
    };
  }

  if (!emailRegex.test(user.email)) {
    return {
      result: false,
      message: "Email is not valid.",
    };
  }

  console.log(user.password, user.passwordConfirm);

  if (user.password !== user.passwordConfirm) {
    return {
      result: false,
      message: "Those passwords didn’t match.",
    };
  }

  try {
    const findedUser = await User.findOne({ email: user.email });

    if (findedUser) {
      return {
        result: false,
        message: "This email has already been signed up.",
      };
    }
  } catch (err) {
    return {
      result: false,
      message: "DB Error."
    };
  }

  return { result: true };
};
