exports.checkPassword = (password1, password2) => {
  if (password1 === password2) {
    return true;
  }

  return;
};

exports.checkExpiration = (timeStamp) => {
  if (timeStamp.getTime() - Date.now() < 0) {
    return false;
  }

  return true;
};
