const Voting = require('../../models/Voting');
const categorizeVotingsByExpiration = require('../../utils/categorizeVotingsByExpiration');
const dayjs = require('dayjs');
const { INDEX, MY_VOTINGS, VOTING_DETAILS } = require('../../constants/views');
const { FULL_DATE_KOREAN } = require('../../constants/');

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
  let isUserCreator = false;
  let isExpired = false;
  let currentUsersPick = null;

  try {
    const voting = await Voting.findById(req.params._id);
    const expirationDate = Date.parse(voting.expires_at);
    const formattedExpirationDate = dayjs(expirationDate).format(FULL_DATE_KOREAN);

    if (req.session.userId === voting.created_by.toString()) {
      isUserCreator = true;
    }

    if (expirationDate < Date.now()) {
      isExpired = true;
    }

    for (const option of voting.options) {
      for (const voter of option.voters) {
        if (voter.toString() === req.session.userId) {
          currentUsersPick = option.content;
        }
      }
    }

    res.status(200).render(VOTING_DETAILS, {
      voting,
      isUserCreator,
      isExpired,
      formattedExpirationDate,
      currentUsersPick,
    });
  } catch (err) {
    next(err);
  }
};
