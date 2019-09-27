
exports.convertDate = (isoString) => {
  const date = new Date(isoString);
  const yy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hours = date.getHours();
  const min = date.getMinutes();

  const addZero = (num) => num < 10 ? '0' + num : num;

  return `${yy}/${addZero(mm)}/${addZero(dd)} ${addZero(hours)}:${addZero(min)}`;
};
