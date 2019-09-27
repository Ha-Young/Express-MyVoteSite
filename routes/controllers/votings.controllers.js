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

    res.render('index', {
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

    res.render('votingsPage', {
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
    //map
    // const temp = await Promise.all(votings.map(async function(voting){
    //   const user = await user.findbyid(voting.create_by);
    //   //몽구스가 준 배열을 수정하는데 이게 수정이 안된다.
    //   //voting._doc (data만 담겨있는 객체)
    //   //객체를 복사
    //   const result = JSON.parse(JSON.stringify(voting._doc))
    //   //console.log(Object.keys(voting));
    //   result.username = user.name;
    //   return result;
    //   //promise resolve값이 리턴된다.
    //   //result에는 promise 인스턴스가 담기게된다. 그래서 promise all을 사용하지 않고서는 제대로된 배열 및 렌더를 하지 않는다.
    //   //promise all은 배열을 받고 리턴 값은 프라미스를 리턴한다(비동기 처리해야함).
    //   //all을 쓴이유는 map을 돌면서 나온 나온 값은 프로미스 인스턴스가 나오고 그 값들이 다 도착할때까지 기다리도록 promise.all을 사용
    //   //promise.all도 비동기이기에 await을 사용한다.
    // }));
    const voteMap = await voteMapping(myVotes);

    res.render('viewMyVote', { voteMap: voteMap, name: req.user.name });
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
  res.render('makeVote', { name: req.user.name, now: now });
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
