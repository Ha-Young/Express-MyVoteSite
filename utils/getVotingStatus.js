module.exports = (startDate, endDate) => {
  const today = Date.now();
  const isStart = today > startDate;
  const isEnd = today > endDate;
  let status = "";

  if (!isStart) {
    status = "예정";
  } else if (isStart && !isEnd) {
    status = "진행중";
  } else if (isStart && isEnd) {
    status = "종료";
  } else {
    status = "취소";
  }

  return status;
};
