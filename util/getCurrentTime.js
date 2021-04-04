const NINE_HOURS = 9 * 3600000;

function getFormattedCurrentDateTime() {
  return new Date(Date.now() + NINE_HOURS).toISOString().substr(0, 16);
}

exports.getFormattedCurrentDateTime = getFormattedCurrentDateTime;
