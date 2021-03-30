function getDateFormat(dateInfo) {
  const date = new Date(dateInfo);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (day < 10) day = `0${day}`;
  if (month < 10) month = `0${month}`;
  if (hour < 10) hour = `0${hour}`;
  if (minute < 10) minute = `0${minute}`;

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

module.exports = getDateFormat;
