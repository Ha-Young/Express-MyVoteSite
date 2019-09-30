exports.login = (res, message) => {
  res.render('login', {
    title: 'Welcome to Vote',
    message
  });
};

exports.signup = (res, message) => {
  res.render('signup/signup', {
    title: 'Please Signup to Vote',
    message
  });
};

exports.votings = (res, message) => {
  res.render('votings/new', {
    title: 'A New Voting',
    message
  });
};
