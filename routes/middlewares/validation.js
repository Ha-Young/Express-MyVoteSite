const { validateUserData, validateVoting } = require("../../util/validation");

function confirmUserData(req, res, next) {
  const validationMessage = validateUserData(req.body);

  if (validationMessage) {
    res.status(200).render("signup", { message: validationMessage });

    return;
  }
  
  delete req.body.confirmPassword; // 여기서 가공해줘도 되나..?

  next();
}

function confirmVotingData(req, res, next) {
  const validationMessage = validateVoting(req.body);
  console.log(req.body);
  if (validationMessage) {
    console.log(validationMessage);
    res.status(200).render("newVoting", { message: validationMessage });

    return;
  }
  
  next();
}

exports.confirmUserData = confirmUserData;
exports.confirmVotingData = confirmVotingData;
