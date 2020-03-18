const Users = require('../models/Users');

module.exports = checkAuthentication = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const loggedInUser = await Users.findById(req.user._id);
    res.locals.loggedInUser = loggedInUser;

    return next();
  }

  res.redirect('/auth/login');
};

// const loggedInUser = {
//   votes_created: [],
//   votes_voted: [],
//   _id: 5e71ebab1881fb352362068a,
//   username: 'soldonii',
//   firstname: 'hyunsol',
//   lastname: 'do',
//   email: 'dhs0113@gmail.com',
//   password: '$2b$12$NTw2UK6/1tH6h0AkrA6fPe27waP0uyctOnrO2UsAXEw21twVW7Uf6',
//   gender: 'male',
//   created_at: 2020-03-18T09:36:43.370Z,
//   updated_at: 2020-03-18T09:36:43.370Z,
//   __v: 0
// }