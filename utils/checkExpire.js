module.exports = function checkExpire(target) {
  return Date.now() > new Date(target).getTime();
};
