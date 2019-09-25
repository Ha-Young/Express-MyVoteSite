const User = require('../../models/User');
const Vote = require('../../models/Vote');


exports.getVoteInfo = async (req, res, next) => {
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
};

exports.viewMyVote = async (req, res, next) => {
  const myVotes = await Vote.find({ creator: req.user.name });

  for (let i = 0; i < myVotes.length; i++) {
    if (myVotes[i].date < new Date()) {
      myVotes[i].proceeding = false;
    }
  }

  res.render('viewMyVote', { myVotes: myVotes });
};

exports.viewmakeVote = async (req, res, next) => {
  res.render('makeVote', { name: req.user.name });
};

exports.makeVote = async (req, res, next) => {
  let newOptions = [];
  for (let i = 0; i < req.body.options.length; i++) {
    newOptions.push({ name: req.body.options[i], member: [] });
  }
  const newVote = new Vote({
    title: req.body.title,
    creator: req.user.name,
    description: req.user.description,
    options: newOptions,
    date: req.body.date
  });
  await newVote.save();
  res.redirect('/');
};

exports.vote = async (req, res, next) => {
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
};

exports.deleteVote = async (req, res, next) => {
  await Vote.findByIdAndDelete(req.params.id);
  res.redirect('/');
}


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
