const router = require('express').Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
router.get('/:id', (req, res, next) => {
  res.send('respond with a resource');
});
router.get('/new', (req, res, next) => {
  res.send('respond with a resource');
});
router.get('/success', (req, res, next) => {
  res.send('respond with a resource');
});
router.get('/error', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;

//  votings
// - /votings/
// - /votings/:id
// - /votings/new
// - /votings/success
// - /votings/error
