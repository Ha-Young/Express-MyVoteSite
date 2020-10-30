const Voting = require('../../models/Voting');
const { calculateTodayDate } = require('../../util/getCurrentDate');

exports.renderNew = (req, res, next) => {
  return res.status(200).render('new');
};

exports.createVoting = async (req, res, next) => {
  const { title, option } = req.body;
  const { _id, username } = req.user;

  const expireDay = req.body['expire-day'];
  const optionArr = option.map(item => {
    return {'text': item, 'voter': []};
  });

  const votingData = {
    title: title,
    expire_day: expireDay,
    option: optionArr,
    creator: username,
    userId: _id
  };

  try {
    await Voting.create(votingData);

    return res.status(201).redirect('/');
  } catch (err) {
    err.status = 400;

    return next(err);
  }
};

exports.getVotingDetail = async (req, res, next) => {
  const { _id } = req.user;
  const { voting_id } = req.params;

  let isAlive = true;
  let isVoted = false;
  let isCreator = false;

  try {
    const voting = await Voting.findById(voting_id);
    const options = voting.option;

    const expireDay = voting.expire_day;
    const currentDate = calculateTodayDate();

    if (JSON.stringify(_id) === JSON.stringify(voting.userId)) {
      isCreator = true;
    }

    if (currentDate > expireDay) {
      isAlive = false;
    }

    for (let i = 0; i < options.length; i++) {
      if (options[i].voter.includes(_id)) {
        isVoted = true;

        break;
      }
    }

    return res.status(200).render('votingDetail', {
      voting,
      isAlive,
      isCreator,
      isVoted
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOptionVoter = async (req, res, next) => {
  const { item } = req.body; // user가 선택한 option string
  const { voting_id } = req.params; // 해당 투표 id값 string
  const { _id } = req.user;

  try {
    const voting = await Voting.findById(voting_id);
    const options = voting.option;

    options.forEach(option => {
      if (option.text === item) {
        option.voter.push(_id);
      }
    });

    await Voting.findByIdAndUpdate(voting_id, {
      option: options
    });

    return res.status(201).render ({
      message: 'voting is success'
    });
  } catch (err) {
    err.status = 400;

    next(err);
  }
};

exports.deleteVoting = async (req, res, next) => {
  const { voting_id } = req.params;

  try {
    await Voting.findByIdAndRemove(voting_id);

    return res.status(200).render('home');
  } catch (err) {
    err.status = 400;

    next(err);
  }
};
