const Voting = require('../../models/Voting');
const messages = require('../../constraint');
const checkValidation = require('../../checkValidation');

const {
  POPUP_MESSAGE_OPTION,
  POPUP_MESSAGE_DATE,
  ALREADY_VOTED_MESSAGE,
  COMPLETE_VOTE_MESSAGE,
  DELETE_MESSAGE,
  CREATE_SUCCESS_MESSAGE,
  CREATE_FAILURE_MESSAGE
} = messages;

exports.getCreateForm = function (req, res, next) {
  const username = req.user ? req.user.username : undefined;

  res.render('createVote', { username });
};

exports.create = async function (req, res, next) {
  const successMessage = CREATE_SUCCESS_MESSAGE;
  const failureMessage = CREATE_FAILURE_MESSAGE;
  const username = req.user.username;
  const { title, option } = req.body;
  const isValid = checkValidation(req.body);
  const optionDetail = [];

  if (!option || option.length <= 1) {
    const popUpMessage = POPUP_MESSAGE_OPTION;
    res.render('createVote', { username, popUpMessage });
    return;
  }

  if (!isValid) {
    const popUpMessage = POPUP_MESSAGE_DATE;
    res.render('createVote', { username, popUpMessage });
    return;
  }

  for (let i = 0; i < option.length; i++) {
    const obj = {};
    obj.description = option[i];
    obj.votes = 0;
    optionDetail.push(obj);
  }

  const newVoting = new Voting({
    author: req.user.email,
    title: title,
    option: optionDetail,
    date: date,
    time: time
  });

  try {
    await newVoting.save();
    res.render('resultMessage', { username, successMessage });

  } catch (err) {
    res.render('resultMessage', { username, failureMessage });
  }

};

exports.getVoteDetail = async function (req, res, next) {
  const username = req.user ? req.user.username : undefined;
  const userEmail = req.user ? req.user.email : undefined;
  const targetVotingId = req.targetVoting._id;
  const options = req.targetVoting.option;
  const {
    title,
    author,
    date,
    time
  } = req.targetVoting;
  const isValid = checkValidation(req.targetVoting);
  let matchCurrentUserAndAuthor = false;
  let finalResult = [];

  if (author === userEmail) {
    matchCurrentUserAndAuthor = true;
  }

  if (!isValid) {
    options.sort((a, b) => {
      if (a.votes > b.votes) {
        return -1;
      }
      if (a.value < b.value) {
        return 1;
      }
      return 0;
    });

    const biggestNum = options[0].votes;

    for (let i = 0; i < options.length; i++) {
      if (options[i].votes === biggestNum) {
        finalResult.push(options[i]);
      }
    }
  }

  res.render('votingDetail', {
    username,
    targetVotingId,
    options,
    title,
    author,
    date,
    time,
    isValid,
    matchCurrentUserAndAuthor,
    finalResult
  });
};

exports.updateVote = async function (req, res, next) {
  const targetOptionId = req.body.targetOptionId;
  const targetVoting = req.targetVoting;

  if (targetVoting.userVoted.indexOf(req.user.email) !== -1) {
    res.json({ message: ALREADY_VOTED_MESSAGE });
    return;
  }

  try {
    await Voting.updateOne(
      { _id: req.params.id, 'option._id': targetOptionId },
      { $push: { userVoted: req.user.email }, $inc: { 'option.$.votes': 1 } }
    );
    res.json({ message: COMPLETE_VOTE_MESSAGE });
  } catch (err) {
    next(err);
  }
};

exports.deleteVote = async function (req, res, next) {
  try {
    await Voting.deleteOne({ _id: req.params.id });
    res.json({ message: DELETE_MESSAGE });
  } catch (err) {
    next(err);
  }
};
