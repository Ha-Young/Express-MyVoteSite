function validateUserData(userInfo) {
  const { name, email, password, confirmPassword } = userInfo;

  if (!name || !email || !password || !confirmPassword) {
    return "Please enter every information";
  }

  if (password.length < 10) {
    return "Please enter password more then 10";
  }

  if (password !== confirmPassword) {
    return "Please match your password";
  }
}

function validateVoting(votingInfo) {
  const { title, expired_at, voting_options } = votingInfo;

  if (!title || !expired_at || !voting_options) {
    return "Please enter every information";
  }

  if (voting_options.length < 2) {
    return "Please enter options more then 2";
  }

  if (new Date(expired_at) < new Date()) {
    return "Please set expired date after now";
  }
}

exports.validateUserData = validateUserData;
exports.validateVoting = validateVoting;
