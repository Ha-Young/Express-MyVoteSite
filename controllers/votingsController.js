exports.home = (req, res, next) => {
  res.render('home', { title: 'Express' });
};

exports.newVote = (req, res, next) => {
  res.render('newVoting');
};

exports.createNewVote = () => {};
