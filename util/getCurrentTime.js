const NINE_HOURS = 9 * 3600000;

function getFormattedCurrentDateTime() {
  // add 9 hours, to get KST(Korea Standard Time, GMT+0900)
  return new Date(Date.now() + NINE_HOURS).toISOString().substr(0, 16);
}

exports.getFormattedCurrentDateTime = getFormattedCurrentDateTime;
