const { check, validationResult } = require('express-validator');

exports.validator = (req, res, next) => {
  const { nickname, email, password, passwordConfirmation } = req.body;

  if (password === passwordConfirmation) next();

  // [
  //   check('nickname')
  //   .isString()
  //   .isLength({ min: 1, max: 8 }),

  //   check('email')
  //   .isEmail(),

  //   check('password')
  //   .isLength({ min: 7, max: 20 })
  //   .custom()
  // ], (req, res) => {
  //   const errors = validationResult(req).array();
  // }
};

// ...rest of the initial code omitted for simplicity.
// const { check, validationResult } = require('express-validator');

// app.post('/user', [
//   // username must be an email
//   check('username').isEmail(),
//   // password must be at least 5 chars long
//   check('password').isLength({ min: 5 })
// ], (req, res) => {
//   // Finds the validation errors in this request and wraps them in an object with handy functions
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }

//   User.create({
//     username: req.body.username,
//     password: req.body.password
//   }).then(user => res.json(user));
// });