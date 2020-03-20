exports.compareCurrentDate = (inputedDate, inputedTime, mergedDate) => {
  if (mergedDate) {
    return new Date() < new Date(mergedDate.toString());
  } else  {
    const mergedDateTime = inputedDate + ' ' + inputedTime;
    return new Date() < new Date(mergedDateTime);
  }
}

exports.makeUTCtime = (inputedDate, inputedTime) => {
  const mergedDateTime = inputedDate + ' ' + inputedTime;
  return new Date(mergedDateTime);
}
