const mongoose = require("mongoose");

const Vote = require("../models/Vote");

function getVotesQuery(condition) {
  let query = {};

  switch (condition) {
    case "open":
      query = { is_progress: true };
      break;
    case "close":
      query = { is_progress: false };
      break;
    case "all":
    default:
      query = {};
      break;
  }

  return query;
}

exports.GetVotes = async ({
  condition,
  page,
  limit,
  sort_field,
  sort_order,
}) => {
  try {
    const query = getVotesQuery(condition);

    const sort = sort_field ? { [sort_field]: sort_order || 1 } : {};

    const voteRecords = await Vote.paginate(query, {
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
    });

    if (!voteRecords) {
      throw new Error("votes was not get");
    }

    return { votesWithPage: voteRecords };
  } catch (error) {
    return { error };
  }
};

exports.GetVoteOfUser = async ({ userId }) => {
  try {
    const votes = await Vote.find({
      creator: mongoose.Types.ObjectId(userId),
    }).lean();

    if (!votes) {
      throw new Error("can't get vote");
    }

    return { votes };
  } catch (error) {
    return { error };
  }
};

exports.GetVote = async ({ voteId, user }) => {
  try {
    const voteRecord = await Vote.findById(voteId).populate(
      "creator",
      "name",
      "User"
    );

    if (!voteRecord) {
      throw new Error("can't get vote");
    }

    const vote = voteRecord.toObject();

    if (user && vote.creator._id.equals(user._id)) {
      vote.myVote = true;
    }

    return { vote };
  } catch (error) {
    return { error };
  }
};

exports.CreateVote = async ({ voteInputDTO, userId }) => {
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
      creator: userId,
      vote_options: voteOptions,
      entire_count: 0,
      is_progress: true,
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

exports.DeleteVote = async voteId => {
  try {
    const voteRecord = await Vote.findByIdAndDelete(voteId);

    if (!voteRecord) {
      throw new Error("vote was not delete");
    }

    const vote = voteRecord.toObject();

    return { vote };
  } catch (error) {
    return { error };
  }
};

exports.VoteToOption = async ({ voteId, optionId }) => {
  try {
    const voteRecord = await Vote.findById(voteId);

    if (!voteRecord) {
      throw new Error("can not find vote...");
    }

    const optionRecord = voteRecord.vote_options.id(optionId);

    if (!optionRecord) {
      // 404 error badrequest
      throw new Error("can not find option...");
    }

    optionRecord.count += 1;
    voteRecord.entire_count += 1;

    voteRecord.save();

    const vote = voteRecord.toObject();

    return { vote };
  } catch (error) {
    return { error };
  }
};
