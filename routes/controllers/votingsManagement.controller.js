const User = require('../../models/User');
const Voting = require('../../models/Voting');
const dayjs = require('dayjs');

exports.create = (req, res, next) => {
  const created_by = req.session.userId;
  const data = req.body;
  const expires_at = `${data['expiration-date'][0]} ${data['expiration-date'][1]}`;
  const { title, options } = data;

  if (options.length < 2) {
    res.status(200).render('failure', {
      message: '선택지를 두 개 이상 입력하세요'
    });

    return;
  }

  // if (Date.parse(expires_at) <= Date.now()) {
  //   res.status(200).render('failure', {
  //     message: '투표 만료 시각을 확인하세요'
  //   });

  //   return;
  // }

  const optionsData = [];
  const cache = {};

  for (const option of options) {
    if (cache.hasOwnProperty(option)) {
      res.status(200).render('failure', {
        message: '중복 선택지가 있습니다'
      });

      return;
    }

    cache[option] = true;

    const voters = [];

    optionsData.push({
      content: option,
      voters
    });
  }

  const newVotingData = new Voting({
    title,
    created_by,
    expires_at,
    options: optionsData,
  });

  Voting.create(newVotingData, async (err, data) => {
    if (err) {
      next(err);

      return;
    }

    try {
      const newVotingId = data._id;
      const currentUser = await User.findById(data.created_by);

      currentUser.votings.push(newVotingId);

      await User.findByIdAndUpdate(
        currentUser._id,
        currentUser,
        { new: true },
      );

      res.status(201).render('createSuccess');
    } catch (err) {
      next(err);
    }
  });
};

exports.drop = async (req, res, next) => {
  try {
    const votingData = await Voting.findById(req.params._id);
    const creatorData = await User.findById(votingData.created_by);
    const indexOfVoting = creatorData.votings.indexOf(votingData._id);

    creatorData.votings.splice(indexOfVoting, 1);

    await User.findByIdAndUpdate(
      creatorData._id,
      creatorData,
      { new: true },
    );

    await Voting.findByIdAndDelete(req.params._id);

    res.status(200).render('dropSuccess');
  } catch (err) {
    next(err);
  }
};

exports.applyVote = async (req, res, next) => {
  const { selectedOptionValue } = req.body;
  const currentUser = req.user._id;

  try {
    const voting = await Voting.findById(req.params._id);
    const { options } = voting;

    for (const option of options) {
      for (const voter of option.voters) {
        if (voter.toString() === currentUser.toString()) {
          res.json({ message: '이미 투표했습니다' });

          return;
        }
      }
    }

    for (const option of options) {
      if (option.content === selectedOptionValue) {
        option.voters.push(currentUser);
      }
    }

    await Voting.findByIdAndUpdate(
      req.params._id,
      voting,
      { new: true },
    );

    res.json({
      result: 'ok',
      message: '투표 완료',
    });
  } catch (err) {
    next(err);
  }
};
