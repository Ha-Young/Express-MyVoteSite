const Voting = require('../models/votingsModel');
const User = require('../models/usersModel');
const { months, days, hours } = require('../constants');

// 투표 제목, 투표 선택 사항, 만료 날짜 및 시간을 입력할 수 있어야 합니다.
exports.renderCreateVoting = (req, res, next) => {
  res.render('voting/newVoting', { months, days, hours });
};

exports.createNewVoting = async (req, res, next) => {
  try {
    const votingInfo = req.body;

    const user = await User.findById(req.session.user_id);
    votingInfo.creator = user.email;

    const voting = await Voting.create(votingInfo);
    console.log(voting, 'vvve');
    res.status(302).redirect('/');
  } catch (err) {
    console.log('err', err);
  }
};

exports.renderVoting = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    const id = req.params.id;
    const voting = await Voting.findById(id);

    console.log(voting, 'eee');

    if (!voting) {
      throw new Error('cant find the voting');
    }

    res.render('voting/voting', {
      voting,
    });
  } catch (err) {
    console.log(err, 'voitng');
    next(err);
  }
};

exports.receiveVotingResult = async (req, res, next) => {
  console.log(req.body.selectOption);

  res.json('result');
};

exports.renderMyVoting = (req, res, next) => {
  res.send('mmma voting');
};
