const createError = require('http-errors');
const Voting = require('../../models/Voting');

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  if (req.session) {
    req.session.redirectUrl = req.headers.referer || req.originalUrl || req.url;
  }
  res.redirect('/login');
};

exports.newVoting = async (req, res, next) => {
  const { email, _id: userId } = req.user;
  const { title, items, endDate } = req.body;
  const votingInfo = Object.keys(req.body);
  const isEmptyValueCheck = votingInfo.every(item => req.body[item].length !== 0);

  if (isEmptyValueCheck) {
    const itemList = [];
    items.forEach(item => itemList.push({ name: item, count: 0 }));
    try {
      new Voting({
        title,
        items: itemList,
        endDate,
        author: email,
        authorId: userId,
        solvedUser: []
      }).save();
      res.render('newVotingSuccess', { user: req.user });
    } catch (error) {
      res.render('newVotingFail', { error, user: req.user });
    }
  } else {
    next(createError(409, {
      message: '빈 값을 제출할수 없습니다'
    }));
  }
};

exports.renderVoting = async (req, res, next) => {
  try {
    const { voting_id: votingId } = req.params;
    const voting = await Voting.findOne({ _id: votingId });
    const votingEndDate = new Date(voting.endDate).getTime();
    const currentDate = new Date().getTime();

    let isAuthor;

    if (req.user) {
      isAuthor = req.user._id === String(voting.authorId);
    } else {
      isAuthor = null;
    }

    if (votingEndDate >= currentDate) {
      res.render('voting', {
        voting,
        isAuthor,
        status: true,
        user: req.user
      });
    } else {
      res.render('voting', {
        voting,
        isAuthor,
        status: false,
        user: req.user
      });
    }
  } catch (error) {
    next(createError({
      message: '해당 투표를 불러올 수 없습니다.'
    }));
  }
}

exports.confirmVoting = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { itemId } = req.body;
  const { voting_id: votingId } = req.params;

  try {
    const voting = await Voting.findById(votingId);
    const isSolvedCheck = voting.solvedUser.includes(userId);
    const endDate = new Date(voting.endDate).getTime();
    const currentDate = new Date().getTime();

    let { items, solvedUser } = voting;

    if (!itemId) {
      return next(createError(409, {
        message: '투표를 체크한 후에 제출해야 합니다'
      }));
    }

    if (isSolvedCheck) {
      return next(createError(409, {
        message: '이미 완료한 투표 입니다'
      }));
    }

    if (endDate < currentDate) {
      return next(createError(409, {
        message: '만료 기간이 지난 투표입니다'
      }));
    }

    //FIXME: 모두 탐색후 값 변경하는데, 효율적 방법 찾기
    for (let i = 0; i < items.length; i++) {
      if (String(items[i]._id) === itemId) {
        items[i].count += 1;
        break;
      }
    };

    if (solvedUser.length) {
      solvedUser = [...solvedUser, userId];
    } else {
      solvedUser = [userId];
    }

    await voting.updateOne({ items, solvedUser });
    res.redirect('/');

  } catch (error) {
    return next(createError({
      message: '해당 투표를 찾을 수 없습니다'
    }));
  }
}

exports.deleteVoting = async (req, res) => {
  const { votingId } = req.body;

  try {
    await Voting.deleteOne({ _id: votingId });
    res.json({ result: true });
  } catch (err) {
    res.json({ result: false });
  }
}
