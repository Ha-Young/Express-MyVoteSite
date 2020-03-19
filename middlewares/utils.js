const Vote = require('../models/Vote');

const calculateRemainTime = vote => {
  const DAY = 24 * 60 * 60 * 1000;
  const HOUR = 60 * 60 * 1000;
  const expiredDate = new Date(vote.expired_date);
  const remainTime = expiredDate - new Date();
  if (remainTime > DAY) {
    return `${Math.floor(remainTime / DAY)}일 ${Math.floor(remainTime % DAY / HOUR)}시간 남음`;
  } else if (remainTime > HOUR) {
    return `${Math.floor(remainTime / HOUR)}시간 남음`;
  } else {
    return `${Math.floor(remainTime / (60 * 1000))}분 남음`;
  }
};

const updateVoteStatus = async (req, res, next) => {
  const votes = await Vote.find({ in_progress: true });
  votes.forEach(async vote => {
    const expired_date = vote.expired_date;
    if (expired_date > new Date()) {
      return vote;
    } else {
      vote.in_progress = false;
      await Vote.findByIdAndUpdate(vote._id, { in_progress: false });
      return vote;
    }
  });

  res.locals.votesInProgress = await Vote.find({ in_progress: true });
  res.locals.votesEnds = await Vote.find({ in_progress: false })
  next();
};

module.exports = {
  calculateRemainTime,
  updateVoteStatus
}
