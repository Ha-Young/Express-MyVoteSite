const Voting = require('../models/votingsModel');
const User = require('../models/usersModel');
const { months, days, hours } = require('../constants');

// 투표 제목, 투표 선택 사항, 만료 날짜 및 시간을 입력할 수 있어야 합니다.
exports.renderCreateVoting = (req, res, next) => {
  res.render('voting/newVoting', { months, days, hours, err: {} });
};

exports.createNewVoting = async (req, res, next) => {
  try {
    // console.log('createNewVoting controller 3st middleware');
    const votingInfo = req.body;

    const user = await User.findById(req.session.user_id);
    votingInfo.creator = user._id;

    const voting = await Voting.create(votingInfo);
    user.createdVoting.push(voting._id);

    await user.updateOne({ $push: { createdVoting: voting._id } });

    res.status(302).redirect('/');
  } catch (err) {
    // console.log(err, 'err in new votig');
    res.render('voting/newVoting', { err: err.errors });
  }
};

exports.renderVoting = async (req, res, next) => {
  try {
    const voting = req.body.voting;
    const result = req.body.result || [];
    // console.log(result, 'result');
    res.render('voting/voting', {
      voting: voting,
      result: result,
      isCreator: req.body.isCreator || undefined,
    });
  } catch (err) {
    console.log(err, 'voitng');
    next(err);
  }
};

exports.receiveVotingResult = async (req, res, next) => {
  try {
    console.log('receiveVotingResult');

    console.log(req.body, 'bd');

    // return res.redirect('/');
    return res.json('sucess');
  } catch (err) {
    next(err);
  }
};

exports.renderMyVoting = (req, res, next) => {
  res.send('mmma voting');
};
