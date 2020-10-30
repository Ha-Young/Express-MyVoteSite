module.exports = (voteDetail) => {
  const { date, time } = voteDetail;
  const dateAndTime = `${date} ${time}:00`
  const isValid = new Date(dateAndTime) > new Date();

  return isValid;
};
