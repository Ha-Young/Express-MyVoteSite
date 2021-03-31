const getLocalTime = (ISOTime) => {
  const year = ISOTime.getFullYear();
  const month = ISOTime.getMonth() + 1;
  const date = ISOTime.getDate();
  const hour = ISOTime.getHours();
  const minute = ISOTime.getMinutes();

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
