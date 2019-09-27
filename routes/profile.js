const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('profile', { title: 'voting-platform', user: req.user });
})

module.exports = router;
