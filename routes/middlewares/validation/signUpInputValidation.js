const User = require("../../../models/User");

async function signUpInputValidation(req, res, next) {
  try {
    const errorMessages = [];
    const {
      email,
      username,
      password,
      confirmedPassword,
    } = req.body;

    if (password !== confirmedPassword) {
      errorMessages.push({ message: "Passwords do not match" });
    }

    if (!email || !username || !password || !confirmedPassword) {
      errorMessages.push({ message: "Please fill out all fileds"});
    }

    const registerPasswordFormat = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$");

    if (password.length < 5 || !registerPasswordFormat.test(password)) {
      errorMessages.push({
        message: "Password should contain at least one number, letter, special character, minimum length 8"
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      errorMessages.push({ message: "This Email is already exist" });
    }

    if (errorMessages.length) {
      errorMessages.forEach(errorMessage => {
        req.flash("messages", errorMessage);
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
