const User = require('../../models/User');
const Voting = require('../../models/Voting');

exports.create = (req, res, next) => {
  const created_by = req.session.userId;
  const data = req.body;
  const expires_at = `${data['expiration-date'][0]} ${data['expiration-date'][1]}`;
  const { title, options } = data;

  const optionsData = [];

  for (const option of options) {
    optionsData.push({
      content: option,
      voters: [],
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

      res.status(201).render('message', {
        message: '투표를 새로 만들었습니다'
      });
    } catch (err) {
      next(err);
    }
  });
};

exports.drop = async (req, res, next) => {
  let votingData;
  let creatorData;

  try {
    votingData = await Voting.findById(req.params._id);
    creatorData = await User.findById(votingData.created_by);
  } catch (err) {
    next(err);
  }

  const votingIndex = creatorData.votings.indexOf(votingData._id);

  creatorData.votings.splice(votingIndex, 1);

  try {
    await User.findByIdAndUpdate(
      creatorData._id,
      creatorData,
      { new: true },
    );
  } catch (err) {
    res.json({
      result: 'error',
      message: '오류가 발생했습니다',
    });

    next(err);
  }

  const creatorDataCopy = { ...creatorData };

  try {
    await Voting.findByIdAndDelete(req.params._id);
  } catch (err) {
    try {
      await User.findByIdAndUpdate(
        creatorData._id,
        creatorDataCopy,
        { new: true },
      );

      res.json({
        result: 'error',
        message: '오류가 발생했습니다',
      });

      next(err);
    } catch (err) {
      res.json({
        result: 'error',
        message: '오류가 발생했습니다',
      });

      next(err);
    }
  }

  res.json({
    result: 'ok',
    message: '삭제 완료',
  });
};

exports.applyVote = async (req, res, next) => {
  const { selectedOptionValue } = req.body;
  const currentUser = req.session.userId;

  try {
    const voting = await Voting.findById(req.params._id);
    const { options } = voting;

    for (const option of options) {
      for (const voter of option.voters) {
        if (voter.toString() === currentUser) {
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
