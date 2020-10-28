const User = require('../../models/User');
const Voting = require('../../models/Voting');

exports.create = (req, res, next) => {
  const created_by = req.session.userId;
  const data = req.body;
  const expires_at = `${data['expiration-date'][0]} ${data['expiration-date'][1]}`;
  const { title, options } = data;
  console.log(data);
  console.log(options);

  if (options.length < 2) {
    res.status(200).render('createFailure', {
      message: '선택지를 두 개 이상 입력하세요'
    });

    return;
  }

  if (Date.parse(expires_at) <= Date.now()) {
    res.status(200).render('createFailure', {
      message: '투표 만료 시각을 확인하세요'
    });

    return;
  }

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

    const newVotingId = data._id;
    const currentUser = await User.findById(data.created_by);

    currentUser.votings.push(newVotingId);

    await User.findByIdAndUpdate(
      currentUser._id,
      currentUser,
      { new: true },
    );

    res.status(201).render('createSuccess');
  });
};

exports.drop = async (req, res, next) => {
  console.log(req.params);

  const votingBefore = await Voting.findById(req.params._id);
  console.log('지우기 전 투표', votingBefore);

  const creatorBefore = await User.findById(votingBefore.created_by);
  console.log('지우기 전 이용자 정보', creatorBefore);

  // await Voting.findByIdAndDelete(req.params._id);

  res.status(204).render('dropSuccess');
};
