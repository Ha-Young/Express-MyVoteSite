const isOpen = comparedDate => {
  const now = new Date();
  const timegap = comparedDate - now;
  return timegap > 0 ? true : false;
};

module.exports = isOpen;
