const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  password: 최소 하나의 문자 + 하나의 숫자 + 하나의 특수문자 포함 6자리 이상
*/
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    validate: {
      validator: function (v) {
        const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return emailRegex.test(v);
      },
      message: props => `${props.value} is not a valid email.`
    }
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    validate: {
      validator: function (v) {
        const emailRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
        return emailRegex.test(v);
      },
      message: props => `${props.value} is not a valid password.`
    }
  },
  name: {
    type: String,
    required: [true, 'Name required'],
    trim: true
  }
});

module.exports = mongoose.model('User', userSchema);
