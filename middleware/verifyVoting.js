const verifyVoting = async (req, res, next) => {
  const isVotingUser = res.locals.isVotingUser;

  if (isVotingUser) {
    return res.render('votings');
  } else {
    next();
  }
};

module.exports = verifyVoting;
