const mongoose = require('mongoose');
const User = require('../models/Users');

exports.registerUser = async (req, res, next) => {
  console.log('signup', req.body);
  // 1. validation - email이 맞는지 등등...
  // try {
  //   const registeredUser = await User.findOne()
  // } catch(err) {
  //   console.log(err);
  // }
};


// req.body = {
//   username: 'soldonii',
//   firstname: 'hyunsol',
//   lastname: 'do',
//   email: 'dhs0113@naver.com',
//   password: 'ehgusthf',
//   confirm_password: 'ehgusthf',
//   gender: 'male'
// }