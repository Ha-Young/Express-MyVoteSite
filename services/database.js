const User = require('../model/User');

class Database {
  //이런 간단한 요청만 해서 보내기엔 여기서 비즈니스 로직을 짜는게 무슨 의미가 있나 싶다.
  async createUser({ email, password, nickname, }) {
    try {
      return await User.create({ email, password, nickname, });
    } catch (err) {
      return new Error(err);
    }
  }
}

module.exports = () => {
  return new Database();
};
