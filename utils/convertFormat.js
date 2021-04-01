const moment = require("moment");

module.exports = (votings) => {
  if (Array.isArray(votings)) {
    const converted = votings.map((voting) => {
      const covertedStartDate = moment(voting.startDate).format("YYYY-MM-DD");
      const convertedEndDate = moment(voting.endDate).format("YYYY-MM-DD");
      const convertedCreateDate = moment(voting.createAt).format("YYYY-MM-DD");
      const convertedCreatedBy = voting.createdBy.name;

      return {
        ...voting,
        startDate: covertedStartDate,
        endDate: convertedEndDate,
        createdAt: convertedCreateDate,
        createdBy: convertedCreatedBy,
      };
    });

    return converted;
  }

  const covertedStartDate = moment(votings.startDate).format("YYYY-MM-DD");
  const convertedEndDate = moment(votings.endDate).format("YYYY-MM-DD");
  const convertedCreateDate = moment(votings.createAt).format("YYYY-MM-DD");
  const convertedCreatedBy = votings.createdBy.name;

  return {
    ...votings,
    startDate: covertedStartDate,
    endDate: convertedEndDate,
    createdAt: convertedCreateDate,
    createdBy: convertedCreatedBy,
  };
};
