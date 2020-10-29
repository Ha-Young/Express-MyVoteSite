const Voting = require('../../models/Voting');
const categorizeVotings = require('../../utils/categorizeVotings');
const dayjs = require('dayjs');

exports.getAll = async (req, res, next) => {
  const currentUserId = req.session.userId;
  console.log(currentUserId);

  try {
    const [openVotingsData, expiredVotingsData]
      = await categorizeVotings({ created_by: currentUserId });

    res.status(200).render('index', { openVotingsData, expiredVotingsData });
  } catch (err) {
    next(err);
  }
};

exports.getMine = async (req, res, next) => {
  const currentUserId = req.session.userId;

  try {
    const [openVotingsData, expiredVotingsData]
      = await categorizeVotings({ created_by: currentUserId }, false);

    res.status(200).render('myVotings', { openVotingsData, expiredVotingsData });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  const voting = await Voting.findById(req.params._id);

  let userIsCreator = false;
  let isExpired = false;
  const expirationDate = Date.parse(voting.expires_at);
  const formattedExpirationDate = dayjs(expirationDate).format('YYYY-MM-DD HH:mm');

  if (req.session.userId === voting.created_by.toString()) {
    userIsCreator = true;
  }

  if (expirationDate < Date.now()) {
    isExpired = true;
  }

  res.status(200).render('votingDetails', {
    voting,
    userIsCreator,
    isExpired,
    formattedExpirationDate
  });
};
