
exports.convertDate = (isoString) => {
  const date = new Date(isoString);
  const yy = date.getFullYear();
  const mm = date.getMonth() + 1;
  const dd = date.getDay();
  const hours = date.getHours();
  const min = date.getMinutes();

  return `${yy}/${mm}/${dd} ${hours}:${min}`;
};
