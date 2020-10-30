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

    //1. 진행중? done
    //2. 로그인? req.session.logined done
    console.log('/:id route final controller');
    const isLoggedin = req.session.logined;
    const userId = req.session.user_id;
    const votingId = req.params.id;
    const voting = await Voting.findById(votingId);

    if (!isLoggedin) req.session.redirectUrl = `/votings/${votingId}`

    //3. 기투표자?
    // req.session.user_id 현재 이용하고 있는 사람 아이디 

    // 서버에서 리다이렉트 하는 것 찾기 

    let isVoted = false;
    voting.selectOptions.forEach((selectOption) => {
      if (selectOption.votedUsers.includes(userId)) {
        isVoted = true;
      }
    });

    //4. 작성자?
    // req.body.voting[0].creator._id 작성자 아이디
    // req.session.user_id 현재 이용하고 있는 사람 아이디
    let isCreator = false;
    console.log(req.session, '/:id route final controller');
    if (voting.creator._id === userId) isCreator = true;


    res.render('voting/voting', {
      voting,
      isLoggedin,
      isVoted,
      isCreator
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



    // return res.redirect('/');
    return res.json('sucess');
  } catch (err) {
    next(err);
  }
};

exports.renderMyVoting = (req, res, next) => {
  res.send('mmma voting');
};
