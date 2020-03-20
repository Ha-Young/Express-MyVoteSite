export function dateTransformer (date) {
  if(new Date(date).toString() === 'Invalid Date') {
    throw new Error(`${date} is not a date type input`);
  }

  const thatDate = new Date(date);
  const year = thatDate.getFullYear();
  const month = thatDate.getMonth();
  const dates = thatDate.getDate();

  return `${year}. ${month + 1}. ${dates}`;
}

export function getIsExpired (date) {
  const currentTime = new Date().getTime();
  const expiratedTime = new Date(date).getTime();

  return expiratedTime - currentTime < 0;
}
