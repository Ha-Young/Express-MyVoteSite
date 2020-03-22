export function getYearMonthDay(timestamp) {
  dateTypeValidation(timestamp);

  const thatDate = new Date(timestamp);
  const year = thatDate.getFullYear();
  const month = thatDate.getMonth();
  const dates = thatDate.getDate();

  return `${year}. ${month + 1}. ${dates}`;
}

export function getIsExpired(timestamp) {
  dateTypeValidation(timestamp);

  const currentTime = new Date().getTime();
  const expiratedTime = new Date(timestamp).getTime();

  return expiratedTime - currentTime < 0;
}

function dateTypeValidation (timestamp) {
  if (new Date(timestamp).toString() === 'Invalid Date') {
    throw new Error(`${timestamp} is not a date type input`);
  }
}
