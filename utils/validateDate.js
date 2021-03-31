function validateDate(firstDate, secondDate) {
  const newFirstDate = new Date(firstDate);
  const newSecondDate = new Date(secondDate);

  return newFirstDate < newSecondDate;
}

module.exports = validateDate;
