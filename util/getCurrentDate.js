function calculateTodayDate () {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  let day = today.getDate();

  if (day.length < 2) {
    day = '0' + day;
  }

  return `${year}-${month}-${day}`;
};

exports.calculateTodayDate = calculateTodayDate;
