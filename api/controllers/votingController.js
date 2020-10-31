const Voting = require('../../models/votingsModel');
const User = require('../../models/usersModel');
const { months, days, hours } = require('../../constants/constants');
const { create } = require('../../models/usersModel');

// 투표 제목, 투표 선택 사항, 만료 날짜 및 시간을 입력할 수 있어야 합니다.
exports.renderCreateVoting = (req, res, next) => {
  res.render('voting/newVoting', { months, days, hours, err: {} });
};

exports.createNewVoting = async (req, res, next) => {
  try {
    const votingInfo = req.body;
    console.log('createNewVoting controller 3st middleware');
    const user = await User.findById(req.session.user_id);

    votingInfo.creator = {
      _id: user._id,
      email: user.email,
    };

    const voting = await Voting.create(votingInfo);

    await user.updateOne({ $push: { createdVoting: voting._id } });

    res.status(302).redirect('/');
  } catch (err) {
    console.log(err, 'err in new votig');
    res.render('voting/newVoting', { err: err.errors });
  }
};

exports.renderVoting = async (req, res, next) => {
  try {
    const voteResult = {
      maxOption: req.body.maxOption,
      maxCount: req.body.maxCount,
    };
    const resultByOptions = req.body.voting;
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
      resultByOptions,
      voteResult,
    });
  } catch (err) {
    console.log(err, 'voitng');
    next(err);
  }
};

exports.receiveVotingResult = async (req, res, next) => {
  try {
    console.log('fetch put last step in receiveVotingResult controller');

    return res.json('sucess');
  } catch (err) {
    next(err);
  }
};

exports.renderMyVoting = async (req, res, next) => {
  const user = await User.findById(req.session.user_id);
  const votings = await Promise.all(
    user.createdVoting.map((created) => {
      const voting = Voting.findById(created);
      return voting;
    })
  );
  console.log(votings, 'in array map');
  res.render('voting/myVoting', { votings });
};

exports.deleteVoting = async (req, res, next) => {
  const votingId = req.body.$ref;
  const userId = req.session.user_id;
  await Voting.deleteOne({ _id: votingId });
  const user = await User.findById(userId);

  user.createdVoting = user.createdVoting.filter(
    (createdVotingId) => createdVotingId.toString() !== votingId
  );

  return res.json('sucess');
};
