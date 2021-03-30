const { format } = require("date-fns");

const Vote = require("../models/Vote");

exports.CreateVote = async ({ voteInputDTO, user }) => {
  try {
    let voteOptions = voteInputDTO["vote_options"];

    if (typeof voteOptions === "string") {
      voteOptions = JSON.parse(voteOptions).map(option => ({
        ...option,
        count: 0,
      }));
    }

    console.log('CreateVote', voteOptions, typeof voteOptions);

    const voteRecord = await Vote.create({
      ...voteInputDTO,
      creator: user._id,
      vote_options: voteOptions,
      expire_datetime: format(new Date(voteInputDTO.expire_datetime), "yyyy-MM-dd hh:mm:ss"),
    });

    if (!voteRecord) {
      throw new Error('vote was not created');
    }

    const vote = voteRecord.toObject();

    return { vote };
  } catch (error) {
    return { error };
  }
};
