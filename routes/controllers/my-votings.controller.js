const Voting = require('../../models/Voting');
const { calculateTodayDate } = require('../../util/getCurrentDate');

exports.showMyVotings = async (req, res, next) => {
  const { _id, username } = req.user;

  try {
    const myVotingList = await Voting.find({ userId: _id });

    const currentDate = calculateTodayDate();

    myVotingList.map((item) => {
      if (currentDate > item.expire_day) {
        item.progress = '투표종료';
      } else {
        item.progress = '진행중';
      }
    });

    return res.status(200).render('my-Votings', {
      username,
      myVotingList
    });
  } catch (err) {
    return next(err);
  }
};
