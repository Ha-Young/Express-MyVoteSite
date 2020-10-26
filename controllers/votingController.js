const Voting = require('../models/votingsModel');

// 투표 제목, 투표 선택 사항, 만료 날짜 및 시간을 입력할 수 있어야 합니다.
exports.renderCreateVoting = (req, res, next) => {
  res.render('newVoting');
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
      votingInfo[attribute] = req.body[attribute]
    })
    votingInfo['selectOptions'] = selectOptions;

    // console.log(votingInfo);
    const voting = await Voting.create(votingInfo)

    res.json('1234')
  } catch (err) {
    console.log('err', err)
  }

};