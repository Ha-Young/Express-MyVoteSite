const Voting = require('../../models/Voting');
const createError = require('http-errors');

exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  if (req.session) {
    req.session.redirectUrl = req.headers.referer || req.originalUrl || req.url;
  }
  res.redirect('/login');
};

exports.newVoting = async (req, res) => {
  const { email, _id: userId } = req.user;
  const { title, items, endDate } = req.body;
  const votingInfo = Object.keys(req.body);
  const isEmptyValueCheck = votingInfo.every(item => req.body[item].length !== 0);

  //FIXME: 빈값 발견시 모달 띄우기
  if (isEmptyValueCheck) {
    const itemList = [];
    items.forEach(item => itemList.push({ name: item, count: 0 }));
    new Voting({
      title,
      items: itemList,
      endDate,
      author: email,
      authorId: userId,
      solvedUser: []
    }).save();
  }
  res.redirect('/');
};

exports.renderVoting = async (req, res) => {
  const { voting_id: id } = req.params;
  const voting = await Voting.findOne({ _id: id });
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
      status: true
    });
  } else {
    res.render('voting', {
      voting,
      isAuthor,
      status: false
    });
  }
}

exports.confirmVoting = async (req, res) => {
  const { _id: userId } = req.user;
  const { itemId } = req.body;
  const { voting_id: votingId } = req.params;

  const voting = await Voting.findById(votingId);
  const isSolvedCheck = voting.solvedUser.includes(userId);
  const endDate = new Date(voting.endDate).getTime();
  const currentDate = new Date().getTime();

  let { items, solvedUser } = voting;

  //FIXME: 투표 미체크후 제출시 메시지처리
  if (!itemId) {
    res.redirect('/');
    return
  }

  //FIXME: 투표 완료한 유저 이미 완료한 투표 메시지 처리 
  if (isSolvedCheck) {
    res.redirect('/');
    return
  }

  //FIXME: 만료 시간이 지났다는 메시지 처리
  if (endDate < currentDate) {
    res.redirect('/');
    return
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

/*
{
  solvedUser: [],
  _id: 5e731b52b9ca6d4204ceb73b,
  title: 'q',
  items: [
    { _id: 5e731b52b9ca6d4204ceb73c, name: 'q1', count: 0 },
    { _id: 5e731b52b9ca6d4204ceb73d, name: 'q2', count: 0 }
  ],
  endDate: '2020-03-20T14:02',
  author: 'a@a.com',
  authorId: 5e722756cccc5f0c40549b8d,
  __v: 0
}
*/
