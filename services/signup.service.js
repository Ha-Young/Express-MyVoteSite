const User = require('../models/User');
const { dbErrorMessage: { DB_ERROR_CREATING_USER } } = require('../constants');

exports.createNewUser = async userInfo => {
  try {
    await User.create(userInfo);
  } catch (error) {
    console.error(DB_ERROR_CREATING_USER);
    throw new Error(error);
  }
};
