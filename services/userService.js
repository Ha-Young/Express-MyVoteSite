const { ERROR } = require('../constants/');

module.exports = class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserbyName(username) {
    try {
      const currentUserData = await this.userModel.findOne({ username });
      return currentUserData;
    } catch (error) {
      console.log(error);
      throw new Error(ERROR.SERVER);
    }
  }

  async getUserbyEmail(email) {
    try {
      const currentUserData = await this.userModel.findOne({ email });
      return currentUserData;
    } catch (error) {
      console.log(error);
      throw new Error(ERROR.SERVER);
    }
  }

  async createUser(userData) {
    try {
      await this.userModel.create(userData);
    } catch (error) {
      console.log(error);
      throw new Error(ERROR.SERVER);
    }
  }
};
