const User = require('../models/User');
const { dbErrorMessage } = require('../constants');

exports.createNewUser = async userInfo => {
  try {
    await User.create(userInfo);
  } catch (error) {
    throw new Error(dbErrorMessage.DB_ERROR_CREATING_USER + error);
  }
};
