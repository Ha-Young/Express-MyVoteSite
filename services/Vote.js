const Vote = require('../models/Vote');

exports.getAllVoteData = async () => {
  const allVoteData = await Vote.find();

  return allVoteData;
};

exports.createNewVote = async (dataToSave) => {
  await Vote.create(dataToSave);
};

exports.getOneVoteData = async (voteObjectId) => {
  const voteData = await Vote.findById(voteObjectId).exec();

  return voteData;
};

exports.updateOneVoteData = async (filter, content) => {
  await Vote.updateOne(filter, content);
};

exports.deleteOneVoteData = async (deleteFilter) => {
  const deleteResult = await Vote.deleteOne(deleteFilter);

  return deleteResult;
};