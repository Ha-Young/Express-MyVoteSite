const User = require("../../../models/User");

async function signUpInputValidation(req, res, next) {
  try {
    const signUpMessages = [];
    const {
      email,
      username,
      password,
      confirmedPassword,
    } = req.body;

    if (!email || !username || !password || !confirmedPassword) {
      signUpMessages.push({ signUpMessage: "Please fill out all fileds" });
    }

    if (password !== confirmedPassword) {
      signUpMessages.push({ signUpMessage: "Passwords do not match" });
    }

    const registerPasswordFormat = new RegExp(
      "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$"
    );

    if (!registerPasswordFormat.test(password)) {
      signUpMessages.push({
        signUpMessage: "Password should contain at least one number, letter, special character, minimum length 8"
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      signUpMessages.push({ signUpMessage: "This Email is already exist" });
    }

    if (signUpMessages.length) {
      signUpMessages.forEach(signUpMessage=> {
        req.flash("signUpMessage", signUpMessage);
      });
      res.redirect("/signup");
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = signUpInputValidation;
