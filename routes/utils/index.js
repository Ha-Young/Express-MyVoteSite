exports.calculateDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

exports.checkInProgress = date => {
  return new Date(date) <= new Date() ? false : true;
};
