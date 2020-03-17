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

exports.makeDisplayInfo = vote => {
  const {
    title,
    vote_id,
    select_options: options,
    created_by: { _id },
    expires_at
  } = vote;

  let totalVoters = 0;
  options.forEach(option => {
    totalVoters += option.vote_counter;
  });

  const expirationDate = getStringifiedDate(expires_at);

  const voteStatus =
    expires_at.toISOString() > new Date().toISOString() ?
    ONGOING :
    CLOSED;

  return {
    voteStatus,
    title,
    vote_id,
    expires_at: expires_at.toISOString(),
    expirationDate,
    options,
    totalVoters,
    created_by: _id
  };
};
