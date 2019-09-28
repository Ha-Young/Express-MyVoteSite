exports.convertDate = date => {
  let convertedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return convertedDate;
}
