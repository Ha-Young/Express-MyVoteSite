const User = require('../../models/User');
const Vote = require('../../models/Vote');
const objectId = require('mongoose').Types.ObjectId;
const moment = require('moment');

exports.getAllVoteInfo = async (req, res, next) => {
  try {
    if (!objectId.isValid(req.user._id)) {
      return next();
    }

    const allVotes = await Vote.find({});
    let dealLine = [];

    for (let i = 0; i < allVotes.length; i++) {
      if (allVotes[i].date < new Date()) {
        allVotes[i].proceeding = false;
      }
      dealLine.push(moment(allVotes[i].date).format("YYYY.MM.DD HH:mm"));
    }

    res.render('index', {
      name: req.user.name || req.user.username,
      allVotes: allVotes,
      dealLine : dealLine
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

    if (voteInfo) {
      if (voteInfo[0].date < new Date()) {
        voteInfo[0].proceeding = false;
      }
    }

    let result = showResult(voteInfo, userInfo);

    res.render('votingsPage', {
      name: userInfo.name,
      voteInfo: voteInfo,
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
    const myVotes = await Vote.find({ creator: req.user.name });

    for (let i = 0; i < myVotes.length; i++) {
      if (myVotes[i].date < new Date()) {
        myVotes[i].proceeding = false;
      }
    }

    res.render('viewMyVote', { myVotes: myVotes });
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
};

exports.viewmakeVote = async (req, res, next) => {
  res.render('makeVote', { name: req.user.name });
};

exports.makeVote = async (req, res, next) => {
  let newOptions = [];
  for (let i = 0; i < req.body.options.length; i++) {
    newOptions.push({ name: req.body.options[i], member: [] });
  }
  try {
    const newVote = new Vote({
      title: req.body.title,
      creator: req.user.name,
      options: newOptions,
      date: req.body.date
    });
    await newVote.save();
    res.redirect('/votings/success');

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
    res.redirect('/');
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
    res.redirect('/');
  } catch (error) {
    if (error.name === 'CastError') {
      return next();
    } else {
      return next(error);
    }
  }
};

let showResult = (arr, userInfo) => {
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
