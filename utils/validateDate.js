/**
 * This function validation two input Date values
 *
 * @param {Date} firstDate date of javascript format
 * @param {Date} secondDate date of javascript format
 * @returns {Boolean} Returns true if the argument of the first date is
 *                    is earlier than the date of the second argument
 */

function validateDate(firstDate, secondDate) {
  const newFirstDate = new Date(firstDate);
  const newSecondDate = new Date(secondDate);

  return newSecondDate < newFirstDate;
}

module.exports = validateDate;
