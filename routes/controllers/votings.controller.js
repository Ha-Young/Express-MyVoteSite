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

  res.redirect('/votings/new');

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
};

exports.voteCheck = async (req, res, next) => {
};

exports.voteDelete = async (req, res, next) => {
};

exports.saveSuccess = (req, res, next) => {
};

exports.saveFailure = (req, res, next) => {
};
