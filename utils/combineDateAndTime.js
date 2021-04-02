function convertDate(date, time) {
  const convertedDate = date.replace("-", "년 ").replace("-", "월 ") + "일";
  const convertedTime = time ? time.replace(":", "시 ") + "분" : "";

  return convertedDate + " " + convertedTime;
}

module.exports = convertDate;
