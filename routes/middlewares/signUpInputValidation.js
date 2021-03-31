const createError = require("http-errors");
const User = require("../../models/User");
// const { ERROR_MESSAGE } = require("../utils/constants");

async function signUpInputValidation (req, res, next) {
  try {
    const { email, username, password, confirmedPassword } = req.body;
    console.log(email, username, password, confirmedPassword)

    const errorMessages = [];

    if (password !== confirmedPassword) {
      errorMessages.push({ message: "Passwords do not match" });
    }

    if (!email || !username || !password || !confirmedPassword) {
      errorMessages.push({ message: "Please fill out all fileds"});
    }

    const registerPasswordFormat = new RegExp("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$");
    console.log(registerPasswordFormat.test(password))
    // if (!registerPasswordFormat.test(password)) {

    /************ TODO : 이메일 형식 validation, 위에 적어놓은 regexp로 검증 다시하기 *********/
    if (password.length < 5) {
      errorMessages.push({ message: "Password should contain at least one number, letter, special character, minimum length 8"});
    }

    const user = await User.findOne({ email });

    if (user) {
      errorMessages.push({ message: "This Email is already exist"});
    }

    if (errorMessages.length) {
        console.log(errorMessages)
      errorMessages.forEach(errorMessage => {
        req.flash('messages', errorMessage);
      });
      res.redirect("/signup");
      return;
    }

    next();

        //res.render("signup", { title: 'Sign up', messages: req.flash('messages'), email, username, password, confirmedPassword });
        // 1) 세션, 2) redirect url, 3) 위의 방법.. -> 하지만 구조가 다깨진다고 생각함..

    // if (!errorMessages.length) {
    //     const newUser = await User.create({ email, username, password });
    //     next();
    //     res.redirect("/login");
    //     return;
    // }

  } catch (error) {
    next(error);
  }
}

module.exports = signUpInputValidation;
