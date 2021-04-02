const createError = require('http-errors');
const Voting = require('../models/Voting');
const User = require('../models/User');

exports.renderNewVoting = function (req, res) {
  res.render('newVoting');
};

exports.createVoting = async function (req, res, next) {
  const { title, userOptions, expiration_date } = req.body;
  const options = userOptions.map((option) => {
    return { optionTitle: option };
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
  const selectedOption = req.body.option;

  try {
    const voting = await Voting.findById(req.votingId);
    const currentUser = await User.findById(req.user);

    if (!voting) {
      return res.status(404).json({ error: 404 });
    }

    if (!voting.isExistOption(selectedOption)) {
      return res.status(400).json({ error: 400 });
    }

    if (currentUser.isAlreadyVote(req.votingId)) {
      return res.status(400).json({ error: "이미 투표했습니다." });
    } else {
      await voting.addVoteCount(selectedOption);
      await currentUser.addVotingList(req.votingId);
    }

    res.json({ success: "성공" });
  } catch (err) {
    next(createError(500, err));
  }
};

exports.deleteVoting = async function (req, res) {
  try {
    await Voting.findOneAndDelete({
      _id: req.votingId,
      author: req.user,
    });

    res.json({ success: "성공" });
  } catch (err) {
    res.status(500).json({ error: "실패" });
  }
};

exports.renderCreateVotingError = function (req, res) {
  res.render('createVotingError');
};

exports.renderCreateVotingSuccess = function (req, res) {
  res.render('createVotingSuccess');
};
