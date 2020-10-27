const Vote = require('../../models/Vote');
const User = require('../../models/User');
const { calculateDate } = require('../utils');

exports.validateInputs = (req, res, next) => {
  const { optionTitle, dueDate } = req.body;

  if (!optionTitle || typeof optionTitle === 'string' || optionTitle.length < 2) {
    return res.render('vote-register', { message: '옵션을 2개 이상 생성하세요.' });
  }

  if (new Date(dueDate) <= new Date()) {
    return res.render('vote-register', { message: '이전 시간은 설정 불가합니다.' });
  }

  next();
};

exports.createNewVote = async (req, res, next) => {
  const { title, optionTitle, dueDate } = req.body;
  const { _id } = req.user;

  // push, each... 고려
  const options = [];
  optionTitle.forEach(option => {
    options.push({ optionTitle: option, votedNumber: [] }); // votedNumber: 0
  });

  // user 업데이트는 분리하는게 좋겠지?
  try {
    const newVote = await Vote.create({ title, writer: _id, due_date: dueDate, options, voter: [] });
    await User.findByIdAndUpdate(_id, { $addToSet: { my_votings: newVote._id } });
    next();
  } catch (error) {
    next(error);
  }
};

exports.getTargetVote = async (req, res, next) => {
  try {
    const { voting_id } = req.params;
    const targetVote = await Vote.findById(voting_id).populate('writer').lean();
    targetVote.due_date = calculateDate(targetVote.due_date);
    req.targetVote = targetVote;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateVoteCount = async (req, res, next) => {
  const optionId = req.body.vote;
  const votingId = req.params.voting_id;
  const userId = req.user._id;

  try {
    const votedUser = await Vote.findById(votingId, 'voter');
    if (votedUser.voter.includes(userId)) {
      // 처리 방안 추가 고민해보기
      req.message = '이미 투표를 하셨습니다.';
      return next();
    }

    await Vote.findOneAndUpdate(
      { 'options._id': optionId },
      { $addToSet: { 'options.$[option].votedCount': req.user._id } },
      { arrayFilters: [{ 'option._id': optionId }] },
    );
    await Vote.findByIdAndUpdate(
      votingId,
      { $addToSet: { voter: req.user._id } }
    );
    next();
  } catch (error) {
    next(error);
  }
};

exports.deleteVote = async (req, res, next) => {
  try {
    const { voting_id } = req.params;
    await User.update(
      { 'my_votings': voting_id },
      { $pull: { 'my_votings': voting_id } },
    );
    await Vote.findOneAndDelete(voting_id);
    next();
  } catch (error) {
    next(error);
  }
};

exports.checkValidVote = async (req, res, next) => {
  const dueDate = req.targetVote.due_date;
  console.log(dueDate, req.params.voting_id);

  if (new Date(dueDate) <= new Date()) {
    return res.redirect(`/votings/result/${req.params.voting_id}`);
  }
  next();
};
