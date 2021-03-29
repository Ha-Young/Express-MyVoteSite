module.exports.getMilisecondByUnit = (expirationTime) => {
  const unit = expirationTime.replace(/[0-9]/g, "");

  if (unit === "s") {
    return 1000;
  } else if (unit === "m") {
    return 1000 * 60;
  } else if (unit === "h") {
    return 1000 * 60 * 60;
  } else if (unit === "d") {
    return 1000 * 60 * 60 * 24;
  }
};

module.exports.getOnlyNumbersFromString = (string) => {
  return Number(string.replace(/[^0-9]/g, ""));
};

module.exports.getOnlyCharsFromString = (string) => {
  return string.replace(/[0-9]/g, "");
};
