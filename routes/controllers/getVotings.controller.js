const VotingService = require('../../services/voting.service');
const votingService = new VotingService();
const tryCatchWrapper = require('../../utils/tryCatchWrapper');
const { INDEX, MY_VOTINGS, VOTING_DETAILS } = require('../../constants/views');

exports.getAll = tryCatchWrapper(async (req, res) => {
  const currentUserId = req.session.userId;
  const [openVotingsData, expiredVotingsData]
    = await votingService.getVotingsByExpiration({ created_by: currentUserId });

  res.status(200).render(INDEX, {
    openVotingsData,
    expiredVotingsData,
    isLoggedIn: !!req.user,
  });
});

exports.getMine = tryCatchWrapper(async (req, res) => {
  const currentUserId = req.session.userId;
  const [openVotingsData, expiredVotingsData]
    = await votingService.getVotingsByExpiration({ created_by: currentUserId }, false);

  res.status(200).render(MY_VOTINGS, { openVotingsData, expiredVotingsData });
});

exports.getOne = tryCatchWrapper(async (req, res) => {
  const votingDetails
    = await votingService.getDetails(req.params._id, req.session.userId);

  res.status(200).render(VOTING_DETAILS, votingDetails);
});
