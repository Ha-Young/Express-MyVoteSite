const Vote = require('../../models/vote');
const convertDate = require('../../utils/combineDateAndTime');
const filterOption = require('../../utils/filterOption');

exports.voteGetAll = async (req, res, next) => {
  const votes = await Vote.find();
  const expiredVote = [];
  const validatedVote = [];

  votes.forEach(async (vote) => {
    if (vote.expiredAt < new Date) {
      expiredVote.push(vote);
      await Vote.findByIdAndUpdate(vote._id, { isProceeding: false }, { new: true });

      return;
    }

    validatedVote.push(vote);
  });

  res.status(200).render('index', { expiredVote, validatedVote });
};

exports.voteCreate = async (req, res, next) => {
  const {
    title,
    option,
    option_type: optionType,
    expired_date: expiredDate,
    expired_time: expiredTime,
  } = req.body;
  const { _id, nickname } = req.user;
  const expiredAt = expiredDate + "T" + expiredTime;
  const convertedExpiredAt = convertDate(expiredDate, expiredTime);

  if (new Date(expiredAt) < new Date()) {
    res.status(200).render('voteCreate');
    return;
  }

  await Vote.create({
    title,
    creater: {
      _id,
      nickname,
    },
    expiredAt,
    convertedExpiredAt,
    optionType,
    options: filterOption(option),
  });

  res.status(200).redirect('/');
};

exports.voteDetail = async (req, res, next) => {
  const { id } = req.params;
  const vote = await Vote.findById(id);
  const { title, creater, expiredAt, convertedExpiredAt, isProceeding, options } = vote;

  res.status(200).render('vote', { title, creater, expiredAt, convertedExpiredAt, isProceeding, options, id });
};

exports.voteUpdate = async (req, res, next) => {
  const { _id: user } = req.user;
  const { id } = req.params;
  const { selected } = req.body;
  const { options, participants } = await Vote.findById(id);

  for (let i = 0; i < participants.length; i++) {
    if (JSON.stringify(participants[i]) === JSON.stringify(user)) {
      res.status(200).json();
      return;
    }
  }

  const updatedOptions = options.map(option => {
    if (option.text === selected) {
      option.count = option.count + 1;
    }

    return option;
  });

  participants.push(user);
  await Vote.findByIdAndUpdate(id, { options: updatedOptions, participants }, { new: true });

  res.status(200).json();
};

exports.voteDelete = async (req, res, next) => {
  const { id } = req.params;

  await Vote.remove({ _id: id });

  res.status(200).json({ response: "delete" });
};

exports.saveSuccess = (req, res, next) => {
};

exports.saveFailure = (req, res, next) => {
};
