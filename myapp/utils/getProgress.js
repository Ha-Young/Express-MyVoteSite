const getProgress = (isoTime) => {
  if (isoTime.getTime() > new Date().getTime()) {
    return false;
  }

  return true;
};

module.exports = getProgress;
