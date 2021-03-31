/**
 * generate date time string based on date
 * @param {Date} date - date object
 * @returns {string} date time string
 */
const generateDateTimeString = (date) => {
  const [fullDate, time] = date.toISOString().split('T');
  return `${fullDate} ${time.substring(0, 5)}`;
};

module.exports = generateDateTimeString;
