const ONGOING = "진행 중", CLOSED = "종료됨";

const getStringifiedDate = isoDate => {
  const convertedDate = new Date(isoDate);

  const year= convertedDate.getFullYear();
  const month= convertedDate.getMonth() + 1;
  const date= convertedDate.getDate();
  const hour= convertedDate.getHours() < 10 ?
    `0${convertedDate.getHours().toString()}` :
    convertedDate.getHours();
  const min= convertedDate.getMinutes() < 10 ?
    `0${convertedDate.getMinutes().toString()}` :
    convertedDate.getMinutes();

  return `${year}년 ${month}월 ${date}일, ${hour}:${min}에 종료`
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

  const expirationDate = getStringifiedDate(expires_at);
  const voteStatus = !expired ? ONGOING : CLOSED;

  return {
    _id,
    expired,
    title,
    voteStatus,
    expires_at: expires_at.toISOString(),
    expirationDate,
    select_options,
    total_voters,
    created_by: username
  };
};
