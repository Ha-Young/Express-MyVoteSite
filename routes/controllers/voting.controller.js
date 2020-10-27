const Vote = require('../../models/Vote');
const User = require('../../models/User');

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
    options.push({ optionTitle: option, votedNumber: 0 });
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
    const targetVote = await Vote.findById(voting_id).populate('writer');
    req.targetVote = targetVote;
    next();
  } catch (error) {
    next(error);
  }
};

exports.updateVoteCount = async (req, res, next) => {
  const optionId = req.body.vote;
  try {
    await Vote.findOneAndUpdate(
      { 'options._id': optionId },
      { $addToSet: { 'options.$[option].votedCount': req.user._id } },
      { arrayFilters: [{ 'option._id': optionId }] }
    );
    await Vote.findByIdAndUpdate(
      req.params.voting_id,
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
