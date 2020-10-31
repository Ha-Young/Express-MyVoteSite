const getFormDate = millsecond => {
  const date = new Date(millsecond);
  const year = date.getFullYear();
  let month = (1 + date.getMonth());
  let day = date.getDate();
  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;

  return `${year}-${month}-${day}`;
};

module.exports = array => {
  for (let i = 0; i < array.length; i++) {
    const expiredDate = getFormDate(array[i].expiredDate);
    array[i]['formDate'] = expiredDate;
  }
};
