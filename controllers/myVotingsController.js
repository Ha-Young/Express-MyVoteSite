const User = require('../models/user');

module.exports = {
  getMyVotings: async (req, res, next) => {
    const { id: userId } = req.user;
    let votingDatas;

    try {
      const { votings } = await User.findById(userId)
        .populate('votings')
        .lean();

      votingDatas = votings;
    } catch (error) {
      next(error);
    }

    votingDatas.forEach((votingData) => {
      const { expiredDate, expiredTime } = votingData;

      const submittedExpiredTime = `${expiredDate} ${expiredTime}`;
      const isExipredTimePassed =
        new Date(`${submittedExpiredTime}`) <= new Date();

      if (isExipredTimePassed) votingData.isVotingEnd = true;
    });
    res.render('myVotings', { votingDatas });
  },
};
