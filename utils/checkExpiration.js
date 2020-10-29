module.exports = function checkExpiration(target) {
  return Date.now() > new Date(target).getTime();
};
