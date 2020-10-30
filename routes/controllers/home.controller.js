const Voting = require('../../models/Voting');
const { calculateTodayDate } = require('../../util/getCurrentDate');

exports.getVotings = async (req, res, next) => {
  try {
    const votingList = await Voting.find();

    const currentDate = calculateTodayDate();

    votingList.map((item) => {
      if (currentDate > item.expire_day) {
        item.progress = '투표종료';
      } else {
        item.progress = '진행중';
      }
    });

    return res.status(200).render('home', {
      votingList
    });
  } catch (err) {
    return next(err);
  }
};
