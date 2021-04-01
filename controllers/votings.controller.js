const Voting = require('../models/Voting');
const User = require('../models/User');

exports.renderNewVoting = async function (req, res, next) {
  res.render('newVoting');
};

exports.createVoting = async function (req, res, next) {
  const { title, userOptions, expiration_date } = req.body;
  const options = userOptions.map((option) => {
    return { optionTitle: option };
  });

  await Voting.create({
    title,
    author: req.user,
    expiration_date,
    options,
  });

  res.redirect('/votings/success');
};

exports.renderVotingDetail = async function (req, res, next) {
  const votingId = req.params.voting_id;

  const voting = await Voting.findById(votingId).lean().populate('author');

  res.render('votingDetail', { voting });
};

exports.addVote = async function (req, res, next) {
  const votingId = req.params.voting_id;
  const selectedOption = req.body.option;

  const voting = await Voting.findById(votingId);
  const currentUser = await User.findById(req.user);

  // FIXME 그래프 테스트용으로 중복체크 해제해둠!!
  // REVIEW method name 뒤에 voted가 맞지 않냐?
  // if (currentUser.isAlreadyVote(votingId)) {
    // TODO 유저가 이미 투표함!!
    // flash 아니면 에러페이지??
    // console.log('너 이미 투표함!')
  // } else {
    await voting.addVoteCount(selectedOption);
    await currentUser.addVotingList(votingId);
  // }
  res.json({ success: "성공" });
};

exports.deleteVoting = async function (req, res, next) {
  // TODO 여기서 지우려는 voting찾고, 그 author가 req.user랑 같은지 판별하는 로직 추가 필요.
  // 한방에 찾고 author가 req.user랑 같으면 지우는 쿼리를 날릴순 없을까??
  const votingId = req.params.voting_id;

  await Voting.findByIdAndDelete(votingId);

  //TODO 삭제 성공 페이지 찍고 가는게 나을듯?
  res.end();
};

exports.renderCreateVotingError = function (req, res, next) {
  res.render('createVotingError');
};

exports.renderCreateVotingSuccess = function (req, res, next) {
  res.render('createVotingSuccess');
};
