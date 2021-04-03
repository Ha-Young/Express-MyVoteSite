const { validateSignUp, validateVoting, validateLogIn } = require("../../util/validation");
const { CLIENT_ERROR } = require("../../constants/error");

exports.confirmLoginData = (req, res, next) => {
  const { value, error } = validateLogIn(req.body);
  
  if (error) {
    req.flash(CLIENT_ERROR.LOGIN_ERROR, error.message);
    res.status(302).redirect("/login");

    return;
  }

  next();
};

exports.confirmSignUpData = (req, res, next) => {
  const { value, error } = validateSignUp(req.body);
  
  if (error) {
    req.flash(CLIENT_ERROR.SIGN_UP_ERROR, error.message);
    res.status(302).redirect("/signup");

    return;
  }

  delete req.body.confirmPassword;

  next();
};

exports.confirmVotingData = (req, res, next) => {
  const { value, error } = validateVoting(req.body);
  
  if (error) {
    req.flash(CLIENT_ERROR.NEW_VOTING_ERROR, error.message);
    res.status(302).redirect("/votings/new");

    return;
  }

  next();
};
