function validateDate(firstDate, secondDate) {
  const newFirstDate = new Date(firstDate);
  const newSecondDate = new Date(secondDate);

  return newSecondDate < newFirstDate;
}

module.exports = validateDate;
