module.exports = function (dateString) {
  console.log(dateString);
  const [date, time] = dateString?.split('T');

  return `${date} ${time.substring(0, 5)}`;
};
