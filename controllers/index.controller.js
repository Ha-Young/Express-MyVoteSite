const Voting = require('../models/Voting');
const moment = require('moment');
const { findUser } = require('../utils/helpers');
const error = require('../lib/error');

exports.getAllVotings = async function(req, res, next) {
  try {
    const user = await findUser(req);
    let votings = await Voting.find();

    const updatedVotings = votings.map(voting => {
      if (!voting.is_expired) {
        const deadline = voting.deadline.getTime();
        const current = new Date().getTime();

        if (deadline < current) {
          return Voting.findByIdAndUpdate(voting._id, { is_expired: true });
        }
      } else {
        return voting;
      }
    });

    await Promise.all(updatedVotings);
    votings = await Voting.find().populate('user', 'nickname');

    res.render('index', { user, votings, moment });
  } catch (err) {
    next(new error.GeneralError());
  }
};

exports.getMyVotings = async (req, res, next) => {
  try {
    const user = await findUser(req);
    const votings = await Voting.find({ user: user._id }).populate('user', 'nickname');

    res.render('my-votings', { user, votings, moment });
  } catch (err) {
    next(new error.GeneralError());
  }
};
