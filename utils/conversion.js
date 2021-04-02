const dayjs = require("dayjs");

exports.convertDate = function (createdAt, day, hour, minute) {
  let expiredAt = createdAt;

  if (!isNaN(day)) {
    expiredAt = dayjs(expiredAt).add(Number(day), "day");
  }

  if (!isNaN(hour)) {
    expiredAt = dayjs(expiredAt).add(Number(hour), "hour");
  }

  if (!isNaN(minute)) {
    expiredAt = dayjs(expiredAt).add(Number(minute), "minute");
  }

  return dayjs(expiredAt).format("YYYY-MM-DD HH:mm:ss");
}
