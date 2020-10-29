const Voting = require('../../models/Voting');
const categorizeVotings = require('../../utils/categorizeVotings');
const dayjs = require('dayjs');

exports.getAll = async (req, res, next) => {
  const currentUserId = req.session.userId;

  try {
    const [openVotingsData, expiredVotingsData]
      = await categorizeVotings({ created_by: currentUserId });

    res.status(200).render('index', {
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
      = await categorizeVotings({ created_by: currentUserId }, false);

    res.status(200).render('myVotings', { openVotingsData, expiredVotingsData });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  let userIsCreator = false;
  let isExpired = false;

  try {
    const voting = await Voting.findById(req.params._id);
    const expirationDate = Date.parse(voting.expires_at);
    const formattedExpirationDate = dayjs(expirationDate).format('YYYY년 M월 D일 HH시mm분');

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
  } catch (err) {
    next(err);
  }
};