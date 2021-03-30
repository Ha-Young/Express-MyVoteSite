const User = require("../../models/User");
const Voting = require("../../models/Voting");
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

exports.validatePostNewVoting = async (req, res, next) => {
  const { expiration } = req.body;
  const timeStamp = new Date(expiration.join(" "));

  if (timeStamp.getTime() - Date.now() < 0) {
    console.log("The expiration date cannot be older than the present!");
    res.redirect("/votings/new");
    return;
  }

  next();
};
