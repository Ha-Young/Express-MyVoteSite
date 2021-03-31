const Vote = require('../../models/vote');
const combineDateAndTime = require('../../utils/combineDateAndTime');

exports.voteGetAll = async (req, res, next) => {
  const votes = await Vote.find();

  res.status(200).render('index', { title: 'Vote Flatform', votes });
};

exports.voteCreate = async (req, res, next) => {
  const {
    title,
    option_type: optionType,
    expired_date: expiredDate,
    expired_time: expiredTime,
    option0,
    option1,
    option2,
    option3,
    option4
  } = req.body;

  await Vote.create({
    title,
    creater: {
      _id: req.user._id,
      nickname: req.user.nickname,
    },
    expiredAt: combineDateAndTime(expiredDate, expiredTime),
    optionType,
    options: filterOption(),
  });

  res.redirect('/');

  function filterOption() {
    const options = [option0, option1, option2, option3, option4];
    const filteredOptions = [];
    let count = 0;

    while (options[count]) {
      filteredOptions.push(options[count]);
      count++;
    }

    return filteredOptions.map(option => ({ text: option }));
  }
};

exports.voteDetail = async (req, res, next) => {
  const { id } = req.params;
  const vote = await Vote.findById(id);
  const { title, creater, expiredAt, isProceeding, options } = vote;
  res.status(200).render('vote', { title, creater, expiredAt, isProceeding, options, id });
};

exports.voteUpdate = async (req, res, next) => {
  const { _id: user } = req.user;
  const { id } = req.params;
  const { selected } = req.body;
  const { options, participants } = await Vote.findById(id);

  for (let i = 0; i < participants.length; i++) {
    if (JSON.stringify(participants[i]) === JSON.stringify(user)) {
      res.status(200).json();
      return;
    }
  }

  const updatedOptions = options.map(option => {
    if (option.text === selected) {
      option.count = option.count + 1;
    }

    return option;
  });

  participants.push(user);
  await Vote.findByIdAndUpdate(id, { options: updatedOptions, participants }, { new: true });
  res.status(200).json();
};

exports.voteDelete = async (req, res, next) => {
  const { id } = req.params;

  await Vote.remove({ _id: id });
  res.status(200).json({ response: "delete" });
};

exports.saveSuccess = (req, res, next) => {
};

exports.saveFailure = (req, res, next) => {
};
