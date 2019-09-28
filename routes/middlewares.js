exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(301).redirect('/auth/login');
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  res.status(301).redirect('/auth/login');
}

exports.convertDate = date => {
  let convertedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return convertedDate;
}
