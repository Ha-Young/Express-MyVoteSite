const Voting = require('../models/votingsModel');
const User = require('../models/usersModel');

// 투표 제목, 투표 선택 사항, 만료 날짜 및 시간을 입력할 수 있어야 합니다.
exports.renderCreateVoting = (req, res, next) => {
  res.render('voting/newVoting');
};

exports.createNewVoting = async (req, res, next) => {
  // console.log(req.body)
  try {
    const votingAttributes = Object.keys(req.body);
    const votingInfo = {};
    const selectOptions = [];
    votingAttributes.forEach((attribute) => {
      if (attribute.startsWith('selectOption')) {
        return selectOptions.push(req.body[attribute]);
      }
      votingInfo[attribute] = req.body[attribute];
    });
    votingInfo.selectOptions = selectOptions;

    const user = await User.findById(req.session.user_id);
    votingInfo.creator = user.email;
    const voting = await Voting.create(votingInfo);

    res.status(302).redirect('/');
  } catch (err) {
    console.log('err', err);
  }
};

exports.renderVoting = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;
    const voting = await Voting.findById(id);

    if (!voting) {
      throw new Error('cant find the voting');
    }

    res.render('voting/voting');
  } catch (err) {
    console.log(err, 'voitng');
    next(err);
  }
};

exports.renderMyVoting = (req, res, next) => {
  res.send('mmma voting');
};
