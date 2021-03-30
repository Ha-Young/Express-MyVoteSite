/**
 * convert ISO string to human friendly strin
 * @param {string} dateString - ISO dateString 
 * @returns {string} human friendly string
 */
module.exports = function (dateString) {
  console.log(dateString);
  const [date, time] = dateString?.split('T');

  return `${date} ${time.substring(0, 5)}`;
};
