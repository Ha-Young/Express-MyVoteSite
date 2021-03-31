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

    if (!votes) {
      return next(createError(400));
    }

    res.render('index', {
      user: req.user,
      currentPage,
      myVotings: false,
      pageNumbers,
      votes,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyVotes = async (req, res, next) => {
  try {
    const currentPage = req.query.page ?? 1;
    const pageNumbers = generatePageNumbers(Number(currentPage), config.pageNumbersLength);
    const features = new APIFeatures(Vote.find({ author: req.user._id }), req.query)
      .sort()
      .limitFields()
      .populate()
      .paginate();
    const votes = await features.query.lean();

    if (!votes) {
      return next(createError(404));
    }

    res.render('myVotings', {
      user: req.user,
      currentPage,
      myVotings: true,
      pageNumbers,
      votes,
    });
  } catch (err) {
    next(err);
  }
};

