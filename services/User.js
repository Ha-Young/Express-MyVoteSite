const User = require('../models/User');

exports.createOneUserData = async (userData) => {
  const newUserData = await User.create(userData);

  return newUserData;
};

exports.getOneUserData = async (userObjectId) => {
  const userData = await User.findById(userObjectId).populate('voteId').exec();

  return userData;
};

exports.updateOneUserData = async (filter, content) => {
  await User.updateOne(filter, content);
};
