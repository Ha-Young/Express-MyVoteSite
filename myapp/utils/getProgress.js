const getProgress = (ISOTime) => {
  if (ISOTime.getTime() > new Date().getTime()) {
    return false;
  }

  return true;
};

module.exports = getProgress;
