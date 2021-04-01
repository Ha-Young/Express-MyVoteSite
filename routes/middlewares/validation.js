const { validateSignUp, validateVoting, validateLogIn } = require("../../util/validation");

function confirmLoginData(req, res, next) {
  const { value, error } = validateLogIn(req.body);
  
  if (error) {
    req.flash("loginError", error.message);
    res.status(302).redirect("/login");

    return;
  }

  next();
}

function confirmSignUpData(req, res, next) {
  const { value, error } = validateSignUp(req.body);

  if (error) {
    req.flash("signUpError", error.message);
    res.status(302).redirect("/signup");

    return;
  }

  delete req.body.confirmPassword;

  next();
}

function confirmVotingData(req, res, next) {
  const validationMessage = validateVoting(req.body);

  if (validationMessage) {
    res.status(200).render("newVoting", { message: validationMessage });

    return;
  }

  next();
}

exports.confirmSignUpData = confirmSignUpData;
exports.confirmVotingData = confirmVotingData;
exports.confirmLoginData = confirmLoginData;
