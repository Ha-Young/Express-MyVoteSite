const express = require('express');
const router = express.Router();

const votingsController = require('./controllers/votings.controller');
const { verifyLoggedIn } = require('./middlewares/auth');

router.get('/new', verifyLoggedIn, votingsController.renderNew);
router.post('/new', votingsController.createVoting);

// router.get('/success', function (req, res, next) {
//   res.render('new', {});
// });

// router.get('/error', function (req, res, next) {
//   res.render('error', {});
// });

// router.get('/votings/:id', function (req, res, next) {
//   res.render('new', {});
// }); voting 개별 페이지

module.exports = router;
