const { format } = require("date-fns");

module.exports = (voting) => {
  const { options, expirationTime } = voting;

  if (new Set(options).size !== options.length) {
    return {
      result: false,
      message: "Options must not be duplicate.",
    };
  }

  const expirationTimeString = expirationTime.replace("T"," ");
  const currentTimeString = format(new Date(), "yyyy-MM-dd HH:mm");

  if (expirationTimeString <= currentTimeString) {
    return {
      result: false,
      message: "Expiration time must be after current time.",
    };
  }

  return { result: true };
};
