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
