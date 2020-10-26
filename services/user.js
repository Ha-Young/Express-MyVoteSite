const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = class UserServices {
  constructor () {
  }

  async getUser (username) {
    const user = await User.findOne({ username });

    console.log(user);

    return user;
  }

  async createUser (userDTO) {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: userDTO.username,
      password: userDTO.password
    });

    const result = await user.save();

    return result;
  }

  async authenticate (userDTO) {
    // 유저로부터 username, pw를 받아온다

    // 받아온 정보로 유저가 가입되어 있는지 확인한다
    const user = await this.getUser(userDTO.username);

    if (!user) {
      return {
        isFailed: true,
        message: 'No user'
      };
    }

    let result;

    // 가입되어 있다면 비밀번호가 정확한지 확인해야 한다
    user.comparePassword(userDTO.password, (err, match) => {
      console.log('패스워드 일치? =>', match);
      if (!match) {
        // 패스워드가 일치하지 않는다면..
        result = {
          isFailed: true,
          message: 'Wrong password'
        };
      } else {
        result = {
          isFailed: false
        };
      }
    });

    // 성공했다면 세션을 만들고, 아이디를 쿠키에 담아 클라이언트 사이드로 보내준다

    return result;
  }
};
