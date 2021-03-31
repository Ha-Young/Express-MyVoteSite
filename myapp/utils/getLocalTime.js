const getLocalTime = (isoTime) => {
  const year = isoTime.getFullYear();
  const month = isoTime.getMonth() + 1;
  const date = isoTime.getDate();
  const hour = isoTime.getHours();
  const minute = isoTime.getMinutes();

  const localTime = {
    year,
    month,
    date,
    hour,
    minute,
  };

  return localTime;
};

module.exports = getLocalTime;
