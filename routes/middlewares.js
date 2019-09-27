exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(301).redirect('/login');
}

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  res.status(301).redirect('/login');
}

exports.convertDate = date => {
  let convertedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return convertedDate;
}
