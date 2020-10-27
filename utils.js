const dateToNumber = stringDate => {
  const splitedDate = stringDate.split('-');
  const year = splitedDate[0];
  const month = splitedDate[1];
  const date = splitedDate[2];

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (date.length < 2) {
    date = `0${date}`;
  }

  return Number(`${year}${month}${date}`);
};

exports.isExpiration = compareDate => {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();

  if (month.toString().length < 2) {
    month = `0${month}`;
  }
  if (date.toString().length < 2) {
    date = `0${date}`;
  }

  const nowDate = Number(`${year}${month}${date}`);
  const expirationDate = dateToNumber(compareDate);

  if (nowDate < expirationDate || nowDate === expirationDate) {
    return true;
  } else {
    return false;
  }
};
