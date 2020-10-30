
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const addNewAccountToDB = async (data) => {
  const newUser = new User({
    email: data.email,
    password: data.password
  });

  await newUser.save((err, doc) => {
    if (err) return err;
    return true;
  });
};

module.exports = addNewAccountToDB;
