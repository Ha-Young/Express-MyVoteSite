const passport = require('passport');

exports.getAll = async function (req, res) {
  const username = req.user ? req.user.username : undefined;
  const votingList = req.votingList;

  res.render('index', { username, votingList });
};

exports.getMyVoting = async function (req, res) {
  const username = req.user.username;
  const myVotingList = req.myVotingList;

  res.render('myVotingList', { username, myVotingList });
};

exports.login = passport.authenticate('google', {
  scope: ['profile', 'email']
});

exports.loginCallback = function (req, res) {
  if (req.session.lastUrl) {
    res.redirect(req.session.lastUrl);
  } else {
    res.redirect('/');
  }
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};
