/**
 * generate page numbers based on pagenumber and length
 * @param {number} pageNumber - standard to fill pageNumbers array
 * @param {number} pageNumbersLnegth - pageNumers length
 * @returns {[number]} [pageNumber] pageNumber array with length pageNumberslength
 */
const generatePageNumbers = (pageNumber, pageNumbersLnegth) => {
  const startNumber = pageNumber - (pageNumber % pageNumbersLnegth) + 1;
  return Array(pageNumbersLnegth).fill(null).map((el, i) => startNumber + i);
};

module.exports = generatePageNumbers;
