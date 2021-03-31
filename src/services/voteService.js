const { format } = require("date-fns");

const Vote = require("../models/Vote");

exports.GetAllVotes = async () => {
  try {
    const votes = await Vote.find().lean();

    return { votes };
  } catch (error) {
    return { error };
  }
};

exports.GetVotes = async ({ page, limit, sort }) => {
  console.log('GetVotes');
  try {
    const voteRecords = await Vote.paginate(
      {},
      {
        sort,
        limit,
        page,
        populate: {
          path: 'creator',
          model: 'User',
          select: {
            name: 1,
          },
        },
      }
    );

    if (!voteRecords) {
      throw new Error('votes was not get');
    }

    console.log(voteRecords);

    return { votesWithPage: voteRecords };
  } catch (error) {
    return { error };
  }
};

exports.CreateVote = async ({ voteInputDTO, user }) => {
  try {
    let voteOptions = voteInputDTO["vote_options"];

    if (typeof voteOptions === "string") {
      voteOptions = JSON.parse(voteOptions).map(option => ({
        ...option,
        count: 0,
      }));
    }

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
