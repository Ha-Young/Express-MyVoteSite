const createError = require('http-errors');
const Voting = require('../models/Voting');
const User = require('../models/User');

exports.renderNewVoting = function (req, res) {
  res.render('newVoting');
};

exports.createVoting = async function (req, res, next) {
  const { title, userOptions, expiration_date } = req.body;
  const options = userOptions.map(option => {
    return { title: option };
  });

  try {
    await Voting.create({
      title,
      author: req.user,
      expiration_date,
      options,
    });

    res.status(301).redirect('/votings/success');
  } catch (err) {
    next(createError(500, err));
  }
};

exports.renderVotingDetail = async function (req, res, next) {
  const votingId = req.params.voting_id;

  try {
    const voting = await Voting.findById(votingId).lean().populate('author');

    res.render('votingDetail', { voting });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.addVote = async function (req, res, next) {
  const votingId = req.params.voting_id;
  const selectedOption = req.body.option;

  try {
    const voting = await Voting.findById(votingId);
    const currentUser = await User.findById(req.user);

    if (!voting) {
      return res.status(404).json({ error: '투표가 존재하지 않습니다.' });
    }

    if (!voting.isExistOption(selectedOption)) {
      return res.status(400).json({ error: '선택한 옵션이 존재하지 않습니다.' });
    }

    if (currentUser.isAlreadyVoted(votingId)) {
      return res.status(400).json({ error: '이미 투표했습니다.' });
    } else {
      await Voting.addVoteCount(votingId, selectedOption);
      await currentUser.addVotingList(votingId);
    }

    res.json({ success: '성공했습니다.' });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.deleteVoting = async function (req, res) {
  const votingId = req.params.voting_id;

  try {
    await Voting.findOneAndDelete({
      _id: votingId,
      author: req.user,
    });

    res.json({ success: '성공했습니다.' });
  } catch (err) {
    res.status(500).json({ error: '삭제하려는 투표가 존재하지 않거나 삭제 권한이 없습니다.' });
  }
};

exports.renderCreateVotingError = function (req, res) {
  res.render('createVotingError');
};

exports.renderCreateVotingSuccess = function (req, res) {
  res.render('createVotingSuccess');
};
