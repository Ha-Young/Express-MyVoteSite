exports.dateFormat = iso => {
  const AM_PM = ['오전', '오후'];
  const MONTH = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const thisDate = new Date(iso);
  const year = thisDate.getFullYear();
  const month = thisDate.getMonth() + 1;
  const date = thisDate.getDate();
  const day = thisDate.getDay();
  const minutes = thisDate.getMinutes();
  let hours = thisDate.getHours();
  let amPmIndex;

  hours < 12 ? (amPmIndex = 0) : (amPmIndex = 1);

  if (hours > 12) hours = hours - 12;

  return `${year}년 ${month}월 ${date}일 ${MONTH[day]} ${AM_PM[amPmIndex]} ${hours}시 ${minutes}분까지`;
};
