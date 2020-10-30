module.exports = class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserbyName(username) {
    let currentUserData;

    try {
      currentUserData = await this.userModel.findOne({ username });
    } catch (error) {
      throw new Error(error);
    }

    return currentUserData;
  }

  async getUserbyEmail(email) {
    let currentUserData;

    try {
      currentUserData = await this.userModel.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }

    return currentUserData;
  }

  async createUser(userData) {
    try {
      await this.userModel.create(userData);
    } catch (error) {
      throw new Error(error);
    }
  }
};
