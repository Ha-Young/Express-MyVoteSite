const moment = require('moment-timezone');

const ONGOING = "진행 중", CLOSED = "종료됨";

const getStringifiedDate = isoDate => {
  const year = isoDate.slice(0, 4);
  const month = isoDate.slice(5, 7);
  const date = isoDate.slice(8, 10);
  const hour = isoDate.slice(11, 13);
  const min = isoDate.slice(14, 16);

  return `${year}년 ${month}월 ${date}일, ${hour}:${min}에 종료`;
};

exports.getDisplayInfo = vote => {
  const {
    _id,
    title,
    select_options,
    total_voters,
    created_by: { username },
    expires_at,
    expired
  } = vote;

  const expiresAtWithLocalTimezone = moment.tz(expires_at, "Asia/Seoul").format();
  const expirationDate = getStringifiedDate(expiresAtWithLocalTimezone);
  const voteStatus = !expired ? ONGOING : CLOSED;

  return {
    _id,
    expired,
    title,
    voteStatus,
    expires_at: expiresAtWithLocalTimezone,
    expirationDate,
    select_options,
    total_voters,
    created_by: username
  };
};

exports.sortVotesByExpiration = voteList => {
  return voteList.sort((a, b) => {
    if ((a.expired && b.expired) || (!a.expired && !b.expired)) {
      return a.expires_at < b.expires_at ? -1 :
        a.expires_at > b.expires_at ? 1 : 0;
    } else if (!a.expired && b.expired) {
      return -1;
    } else {
      return 1;
    }
  });
};
