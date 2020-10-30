const categorizeVotingsByExpiration = require('../../utils/categorizeVotingsByExpiration');
const { INDEX, MY_VOTINGS, VOTING_DETAILS } = require('../../constants/views');
const VotingService = require('../../services/voting.service');
const tryCatchWrapper = require('../../utils/tryCatchWrapper');

exports.getAll = tryCatchWrapper(async (req, res) => {
  const currentUserId = req.session.userId;
  const [openVotingsData, expiredVotingsData]
    = await categorizeVotingsByExpiration({ created_by: currentUserId });

  res.status(200).render(INDEX, {
    openVotingsData,
    expiredVotingsData,
    isLoggedIn: !!req.user,
  });
});

exports.getMine = tryCatchWrapper(async (req, res) => {
  const currentUserId = req.session.userId;
  const [openVotingsData, expiredVotingsData]
    = await categorizeVotingsByExpiration({ created_by: currentUserId }, false);

  res.status(200).render(MY_VOTINGS, { openVotingsData, expiredVotingsData });
});

exports.getOne = tryCatchWrapper(async (req, res) => {
  const votingDetails
    = await new VotingService()
      .getDetails(req.params._id, req.session.userId);

  res.status(200).render(VOTING_DETAILS, votingDetails);
});
