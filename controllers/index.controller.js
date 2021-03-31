const createError = require('http-errors');

const User = require('../models/User');
const Vote = require('../models/Vote');
const APIFeatures = require('../utils/APIFeatures');
const generatePageNumbers = require('../utils/generatePageNumbers');
const config = require('../config');

exports.getHome = async (req, res, next) => {
  const redirectAddress = req.flash('redirect');

  if (redirectAddress.length) {
    return res.redirect(redirectAddress[0]);
  }

  try {
    const currentPage = req.query.page ?? 1;
    const pageNumbers = generatePageNumbers(Number(currentPage), config.pageNumbersLength);
    const features = new APIFeatures(Vote.find(), req.query)
      .sort()
      .limitFields()
      .populate()
      .paginate();
    const votes = await features.query.lean();

    if (votes.length === 0) {
      return next(createError(404));
    }

    res.render('index', {
      user: req.user,
      currentPage,
      pageNumbers,
      votes,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyVotes = (req, res) => {
  const title = 'Sign Up';
  const infoMessages = req.flash('info');
  const message = req.flash('error');

  res.render('myVotings', {
    title,
    infoMessages,
    message
  });
};

