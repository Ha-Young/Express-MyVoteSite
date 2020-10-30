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
    votingInfo.creator = {
      _id: user._id,
      email: user.email,
    };
    const voting = await Voting.create(votingInfo);
    user.createdVoting.push(voting._id);

    await user.updateOne({ $push: { createdVoting: voting._id } });
    console.log(votingInfo, 'votingInfo');
    console.log(voting, 'voting');
    res.status(302).redirect('/');
  } catch (err) {
    // console.log(err, 'err in new votig');
    res.render('voting/newVoting', { err: err.errors });
  }
};

exports.renderVoting = async (req, res, next) => {
  try {
    const voteResult = req.session.voteResult || undefined;
    console.log(voteResult, '/:id render voting');
    const isLoggedin = req.session.logined;
    const userId = req.session.user_id || '5f9bd73e3eaed512dd43c321';
    const votingId = req.params.id;
    const voting = await Voting.findById(votingId);

    if (!isLoggedin) req.session.redirectUrl = `/votings/${votingId}`;

    let isVoted = false;
    voting.selectOptions.forEach((selectOption) => {
      if (selectOption.votedUsers.includes(userId)) {
        isVoted = true;
      }
    });

    let isCreator = false;
    if (voting.creator._id.toString() === userId) {
      isCreator = true;
    }

    res.render('voting/voting', {
      voting,
      isLoggedin,
      isVoted,
      isCreator,
      voteResult,
    });
    // res.json({ status: 'success' })
  } catch (err) {
    console.log(err, 'voitng');
    next(err);
  }
};

exports.receiveVotingResult = async (req, res, next) => {
  try {
    console.log('fetch put last step in receiveVotingResult controller');
    delete req.body.data;
    req.session.voteResult = req.body;

    return res.json('sucess');
  } catch (err) {
    next(err);
  }
};

exports.renderMyVoting = (req, res, next) => {
  res.send('mmma voting');
};
