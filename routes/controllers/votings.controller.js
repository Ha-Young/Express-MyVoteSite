const Vote = require('../../models/vote');

exports.voteCreatePost = async (req, res, next) => {
  const {
    title,
    option_type: optionType,
    expired_date: expiredDate,
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
    expiredDate,
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
  const { title, creater, expiredDate, isProceeding, options } = vote;
  res.render('vote', { title, creater, expiredDate, isProceeding, options, id });
};

exports.voteCheck = async (req, res, next) => {
  const { _id: user } = req.user;
  const { id } = req.params;
  const { selected } = req.body;
  const { options, participants } = await Vote.findById(id);

  for (let i = 0; i < participants.length; i++) {
    if (JSON.stringify(participants[i]) === JSON.stringify(user)) {
      res.json();
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
  res.json();
};

exports.voteDelete = async (req, res, next) => {
};

exports.saveSuccess = (req, res, next) => {
};

exports.saveFailure = (req, res, next) => {
};
