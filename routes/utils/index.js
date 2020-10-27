exports.calculateDate = date => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

exports.checkInProgress = date => {
  return new Date(date) <= new Date() ? false : true;
};
