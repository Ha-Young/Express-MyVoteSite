function getIsoTzHHMM(tzOffsetMinutes) {
  let hh = Math.floor(tzOffsetMinutes / -60).toString();
  let mm = (Math.abs(tzOffsetMinutes) - 60 * hh).toString();
  hh = (hh < 10) ? '0' + hh : hh;
  mm = (mm < 10) ? '0' + mm : mm;
  hh = (tzOffsetMinutes < 0) ? '+' + hh : '-' + hh;
  return `${hh}:${mm}`;
}

function getGmtFromDatetimeLocal(datetimeLocal, tzOffsetMinutes) {
  return (datetimeLocal + getIsoTzHHMM(tzOffsetMinutes));
}

module.exports = {
  getGmtFromDatetimeLocal
}
