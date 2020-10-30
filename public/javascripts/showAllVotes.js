const Vote = require('../../models/Vote');

const allVotes = async () => {
  return await Vote.find({});
};

allVotes();
