const ONGOING = "진행 중", CLOSED = "종료됨";

const splitDate = isoDate => {
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

  return `${year}년 ${month}월 ${date}일, ${hour}:${min}`
};

exports.makeVisualData = vote => {
  const {
    title,
    select_options: options,
    created_by: { username },
    expires_at
  } = vote;

  let totalVoters = 0;
  options.forEach(option => {
    totalVoters += option.vote_counter;
  });

  const expirationDate = splitDate(expires_at);

  const voteStatus =
    expires_at.toISOString() > new Date().toISOString() ?
    ONGOING :
    CLOSED;

  return {
    voteStatus,
    title,
    expirationDate,
    options,
    totalVoters,
    username
  };
};
