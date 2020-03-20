exports.dateInfo = (isoString) => {
  const date = new Date(isoString);
  const yy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const setZero = (num) => num < 10 ? '0' + num : num;

  return `${yy}/${setZero(mm)}/${setZero(dd)} ${setZero(hours)}:${setZero(minutes)}`;
};
