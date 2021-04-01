function getFormattedCurrentDateTime() {
  return new Date(Date.now() + 9 * 3600000).toISOString().substr(0, 16);
}

exports.getFormattedCurrentDateTime = getFormattedCurrentDateTime;
