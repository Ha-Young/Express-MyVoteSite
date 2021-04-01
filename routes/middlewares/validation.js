const { validateSignUp, validateVoting, validateLogIn } = require("../../util/validation");

exports.confirmLoginData = (req, res, next) => {
  const { value, error } = validateLogIn(req.body);
  
  if (error) {
    req.flash("loginError", error.message);
    res.status(302).redirect("/login");

    return;
  }

  next();
};

exports.confirmSignUpData = (req, res, next) => {
  const { value, error } = validateSignUp(req.body);
  
  if (error) {
    req.flash("signUpError", error.message);
    res.status(302).redirect("/signup");

    return;
  }

  delete req.body.confirmPassword;

  next();
};

exports.confirmVotingData = (req, res, next) => {
  const { value, error } = validateVoting(req.body);
  
  if (error) {
    console.log(error.message);
    req.flash("newVotingError", error.message);
    res.status(302).redirect("/votings/new");

    return;
  }

  next();
};
