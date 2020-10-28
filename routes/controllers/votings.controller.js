const User = require('../../models/User');
const Voting = require('../../models/Voting');

exports.create = (req, res, next) => {
  const created_by = req.session.userId;
  const data = req.body;
  const expires_at = `${data['expiration-date'][0]} ${data['expiration-date'][1]}`;
  const { title, options } = data;

  if (options.length < 2) {
    res.status(200).render('createFailure', {
      message: '선택지를 두 개 이상 입력하세요'
    });

    return;
  }

  // if (Date.parse(expires_at) <= Date.now()) {
  //   res.status(200).render('createFailure', {
  //     message: '투표 만료 시각을 확인하세요'
  //   });

  //   return;
  // }

  let optionsData = [];

  for (const option of options) {
    const content = option;
    const voters = [];

    optionsData.push({ content, voters });
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

    console.log('ㅇㅕ기');
    res.status(200).render('dropSuccess');
  } catch (err) {
    next(err);
  }
};
