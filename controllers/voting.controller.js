const { findUser, checkSameUser } = require('../utils/helpers');
const Voting = require('../models/Voting');
const moment = require('moment');
const error = require('../lib/error');

exports.getCreationPage = async function(req, res) {
  const user = await findUser(req);

  res.render('voting-creation', { user });
};

exports.getDetail = async function(req, res, next) {
  try {
    const user = await findUser(req);
    const { id } = req.params;
    const voting = await Voting.findById(id).populate('user');
    const votingUserId = voting.user._id;

    if (checkSameUser(user, votingUserId)) {
      return res.render('voting-detail', {
        voting,
        moment,
        user,
        sameUser: true
      });
    }

    if (voting.is_expired) {
      voting.options.sort((a, b) => {
        return a.option_count > b.option_count ? -1 : 1;
      });

      return res.render('voting-detail', { voting, moment, user });
    }
    req.session.returnTo = req.originalUrl;
    res.render('voting-detail', { voting, moment, user });
  } catch (err) {
    next(new error.GeneralError());
  }
};

exports.create = async function(req, res, next) {
  try {
    const { 'voting-title': title, options, date, time } = req.body;
    const user = await findUser(req);
    const votingByVotingTitle = await Voting.findOne({ title });
    const optionArray = options.map(option => {
      return {
        option_title: option,
        option_count: 0
      };
    });
    const deadline = new Date(`${date} ${time}`).getTime();
    const currentTime = new Date().getTime();

    if (votingByVotingTitle) throw new error.VotingTitleDuplicateError();
    if (!title.trim() || !date.trim() || !time.trim()) {
      throw new error.VotingValidationError();
    }
    if (deadline < currentTime) throw new error.VotingTimeError();
    optionArray.forEach(item => {
      if (!item.option_title.trim()) {
        throw new error.VotingValidationError();
      }
    });

    await new Voting({
      user,
      title,
      deadline,
      options: optionArray
    }).save();

    res.render('voting-creation', { user, success: '투표 생성 성공!' });
  } catch (err) {
    if (
      err instanceof error.VotingTimeError ||
      err instanceof error.VotingValidationError ||
      err instanceof error.VotingTitleDuplicateError
    ) {
      return res.render('voting-creation', { error: err.displayMessage });
    }
    next(new error.GeneralError());
  }
};

exports.update = async function(req, res, next) {
  const { votingId, optionId } = req.params;
  let voting = await Voting.findById(votingId);
  const votingUserId = voting.user._id;
  const user = await findUser(req);
  const votedUser = voting.voted_user.find(userId => {
    return String(userId) === String(user._id);
  });

  try {
    const target = await Voting.findOne(
      { _id: votingId, 'options._id': optionId },
      { 'options.$': 1 }
    );
    let { option_count: count } = target.options[0];

    if (votedUser !== undefined) {
      throw new error.VotingDuplicateError();
    }

    await Voting.updateOne(
      { 'options._id': optionId },
      {
        $set: {
          'options.$.option_count': parseInt(count) + 1
        }
      }
    );

    await Voting.findByIdAndUpdate(votingId, { $push: { voted_user: user._id } });
    voting = await Voting.findById(votingId).populate('user', 'nickname');

    if (checkSameUser(user, votingUserId)) {
      return res.render('voting-detail', {
        voting,
        moment,
        user,
        sameUser: true,
        success: '투표 성공!!'
      });
    }

    res.render('voting-detail', { user, voting, moment, success: '투표 성공!!' });
  } catch (err) {
    const voting = await Voting.findById(votingId).populate('user', 'nickname');
    if (err instanceof error.VotingDuplicateError) {
      if (checkSameUser(user, votingUserId)) {
        return res.render('voting-detail', {
          voting,
          moment,
          user,
          sameUser: true,
          error: err.displayMessage
        });
      }
      res.render('voting-detail', {
        user,
        voting,
        moment,
        error: err.displayMessage
      });
    }
    next(new error.GeneralError());
  }
};

exports.remove = async function(req, res, next) {
  try {
    const user = findUser(req);
    const { id } = req.params;

    await Voting.findByIdAndDelete(id);

    res.render('success', { user, message: '삭제' });
  } catch (err) {
    next(new error.GeneralError());
  }
};
