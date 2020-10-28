const verifyVoting = async (req, res, next) => {
  const isVotingUser = res.locals.isVotingUser;

  if (isVotingUser) {
    res.redirect(`/votings/${req.params.voting_id}`);
  } else {
    next();
  }
};

module.exports = verifyVoting;
