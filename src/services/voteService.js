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

function getVotesQuery(condition) {
  let query = {};

  switch (condition) {
    case "open":
      query = { is_process: true };
      break;
    case "close":
      query = { is_process: false };
      break;
    case "all":
    default:
      query = {};
      break;
  }

  return query;
}

exports.GetVotes = async ({ condition, page, limit, sort_field, sort_order }) => {
  try {
    const query = getVotesQuery(condition);

    const sort = sort_field
      ? { [sort_field]: sort_order || 1 }
      : {};

    const voteRecords = await Vote.paginate(
      query,
      {
        sort,
        limit,
        page,
        populate: {
          path: "creator",
          model: "User",
          select: {
            name: 1,
          },
        },
      }
    );

    if (!voteRecords) {
      throw new Error("votes was not get");
    }

    return { votesWithPage: voteRecords };
  } catch (error) {
    return { error };
  }
};

exports.CreateVote = async ({ voteInputDTO, user }) => {
  try {
    let voteOptions = voteInputDTO.vote_options;

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
      expire_datetime: format(
        new Date(voteInputDTO.expire_datetime),
        "yyyy-MM-dd hh:mm:ss"
      ),
    });

    if (!voteRecord) {
      throw new Error("vote was not created");
    }

    const vote = voteRecord.toObject();

    return { vote };
  } catch (error) {
    return { error };
  }
};
