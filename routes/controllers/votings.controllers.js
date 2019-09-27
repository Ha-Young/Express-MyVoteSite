const User = require('../../models/User');
const Vote = require('../../models/Vote');
const ObjectId = require('mongoose').Types.ObjectId;
const moment = require('moment');

exports.getAllVoteInfo = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.user._id)) {
      return next();
    }

    const allVotes = await Vote.find({});
    const voteMap = await voteMapping(allVotes);

    res.status(201).render('index', {
      name: req.user.name,
      voteMap: voteMap,
      allVotes: allVotes
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
};

exports.getVoteInfo = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ _id: req.user._id });
    const voteInfo = await Vote.find({ _id: req.params.id });
    const voteMap = await voteMapping(voteInfo);
    const result = showResult(voteInfo, userInfo);

    res.status(201).render('votingsPage', {
      name: userInfo.name,
      voteMap: voteMap[0],
      isVoted: result[2],
      winner: { count: result[0], name: result[1] }
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
};

exports.viewMyVote = async (req, res, next) => {
  try {
    const myVotes = await Vote.find({ creator: req.user._id });
    const voteMap = await voteMapping(myVotes);

    res
      .status(201)
      .render('viewMyVote', { voteMap: voteMap, name: req.user.name });
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
};

exports.viewmakeVote = async (req, res) => {
  const now = moment(new Date()).format('YYYY-MM-DDTHH:mm');
  res.status(201).render('makeVote', { name: req.user.name, now: now });
};

exports.makeVote = async (req, res, next) => {
  let newOptions = [];
  for (let i = 0; i < req.body.options.length; i++) {
    newOptions.push({ name: req.body.options[i], member: [] });
  }
  try {
    const newVote = new Vote({
      title: req.body.title,
      creator: req.user._id,
      options: newOptions,
      date: req.body.date
    });
    await newVote.save();
    res.status(302).redirect('/votings/success');
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
};

exports.vote = async (req, res, next) => {
  try {
    const voter = await Vote.findOne({
      _id: req.params.id
    });
    voter.options.forEach(element => {
      let flag = true;
      element.member.forEach(name => {
        if (name.toString() === req.user._id) {
          flag = false;
        }
      });
      if (element._id.toString() === req.body.optionsChoice && flag) {
        element.member.push(req.user._id);
      }
    });
    await voter.save();
    res.status(302).redirect('/');
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
};

exports.deleteVote = async (req, res, next) => {
  try {
    await Vote.findByIdAndDelete(req.params.id);
    res.status(302).redirect('/');
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
};

const showResult = (arr, userInfo) => {
  let maxlengthIndex = 0;
  let index = [];
  let isVoted = true;

  for (let i = 0; i < arr[0].options.length; i++) {
    arr[0].options[i].member.find(element => {
      if (element.toString() === userInfo._id.toString()) {
        isVoted = false;
      }
    });
    if (arr[0].options[i].member.length > maxlengthIndex) {
      maxlengthIndex = arr[0].options[i].member.length;
      index = [i];
    } else if (arr[0].options[i].member.length === maxlengthIndex) {
      index.push(i);
    }
  }
  return [maxlengthIndex, index, isVoted];
};

const voteMapping = async vote => {
  try {
    const voteMap = await Promise.all(
      vote.map(async function(voting) {
        const user = await User.findById(voting.creator);
        const result = JSON.parse(JSON.stringify(voting._doc));
        result.username = user.name;
        result.date = moment(voting.date).format('YYYY.MM.DD HH:mm');
        if (voting.date < new Date()) {
          result.proceeding = false;
        }
        return result;
      })
    );
    return voteMap;
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
};
