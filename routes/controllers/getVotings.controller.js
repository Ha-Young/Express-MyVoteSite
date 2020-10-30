const categorizeVotingsByExpiration = require('../../utils/categorizeVotingsByExpiration');
const { INDEX, MY_VOTINGS, VOTING_DETAILS } = require('../../constants/views');
const VotingService = require('../../services/voting.service');

exports.getAll = async (req, res, next) => {
  const currentUserId = req.session.userId;

  try {
    const [openVotingsData, expiredVotingsData]
      = await categorizeVotingsByExpiration({ created_by: currentUserId });

    res.status(200).render(INDEX, {
      openVotingsData,
      expiredVotingsData,
      isLoggedIn: !!req.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMine = async (req, res, next) => {
  const currentUserId = req.session.userId;

  try {
    const [openVotingsData, expiredVotingsData]
      = await categorizeVotingsByExpiration({ created_by: currentUserId }, false);

    res.status(200).render(MY_VOTINGS, { openVotingsData, expiredVotingsData });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const votingDetails = await new VotingService().getDetails(req.params._id, req.session.userId);

    res.status(200).render(VOTING_DETAILS, votingDetails);
  } catch (err) {
    next(err);
  }
};
