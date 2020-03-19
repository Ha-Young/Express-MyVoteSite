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

module.exports = { calculateRemainTime };
