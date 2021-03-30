const User = require("../../models/User");
const { checkPassword } = require("../../utils/validates")

exports.validatePostSignUp = async (req, res, next) => {
  const { email, password1, password2 } = req.body;
  const isExistEmail = await User.exists({ email });

  if (isExistEmail) {
    console.log("exist email!");
    res.redirect("/auth/signup");
    return;
  }

  if (!checkPassword(password1, password2)) {
    console.log("two password should be equal!");
    res.redirect("/auth/signup");
    return;
  }

  next();
};
