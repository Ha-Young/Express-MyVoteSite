/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const Votes = require('../models/Votes');
const format = require('date-fns/format');

exports.getVotingForm = (req, res, _next) => {
  // const { userName } = req.user;
  const nowDate = format(new Date(), 'yyyy-MM-dd');

  console.log(nowDate);

  res.status(200).render('votingForm', {
    minDate: nowDate,
  });
};

exports.createVote = async (req, res, next) => {
  const { options, title, expiration } = req.body;
  const userId = req.user._id;
  const option = options.map(option => ({ desc: option, count: 0 }));

  try {
    await Votes.create({
      title: title,
      expiration: expiration,
      options: option,
      creator: userId,
    });

    res.redirect('/votings');
  } catch (err) {
    next(err);
  }
};

exports.getVotingList = async (req, res, next) => {
  // const { userName } = req.user;
  try{
    const votes = await Votes.find();

    const formattedExpireDate = votes.map(vote => format(vote.expiration, 'yyyy/MM/dd'));
    const formattedCreateDate = votes.map(vote => format(vote.createdAt, 'yyyy/MM/dd'));

    const expiredMessage = votes.map(vote => {
      return new Date() > vote.expiration ? '투표 종료' : '투표 중';
    });

    res.render('votingList', {
      votes: votes,
      expirationDate: formattedExpireDate,
      createdDate: formattedCreateDate,
      expired: expiredMessage,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  // const { userName } = req.user;
  const id = req.params._id;

  try {
    const vote = await Votes.findOne({ id });

    const formattedExpireDate = format(vote.expiration, 'yyyy/MM/dd HH:mm');
    const formattedCreateDate = format(vote.createdAt, 'yyyy/MM/dd HH:mm');
    const expiredMessage = new Date() > vote.expiration ? '투표 종료' : '투표 중';

    res.render('vote', {
      vote: vote,
      expirationDate: formattedExpireDate,
      createdDate: formattedCreateDate,
      expired: expiredMessage,
    });
  } catch (err) {
    next(err);
  }
};


exports.updateOne = async (req, res, next) => {
  const voteId = req.params._id;
  const optionId = req.body.select;

  try {
    const vote = await Votes.findOne({ voteId });
    console.log(vote);
    let count = 0;
    let newCount = count + 1;

    await Votes.findByIdAndUpdate(
      optionId,
      { counts: newCount },
      { new: true },
    );

    res.redirect(`/votings/${voteId}`);

  } catch (err) {
    next(err);
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    console.log('delete item');
  } catch (err) {
    next(err);
  }
};

exports.getMyVoting = async (req, res, next) => {
  try {
    res.render('myVoting');
  } catch (err) {
    next(err);
  }
};

