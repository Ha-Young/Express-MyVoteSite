const moment = require("moment");

module.exports = (startDate, endDate) => {
  const now = parseInt(moment().format("x"), 10);
  const start = parseInt(moment(startDate).format("x"), 10);
  const end = parseInt(moment(endDate).format("x"), 10);

  const isStart = now > start;
  const isEnd = now > end;
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
