const express = require('express');

const router = express.Router();

// router.get('/:id', function (req, res, next) {});

// router.post('/:id', function (req, res, next) {});

// router.delete('/:id', function (req, res, next) {});

router.get('/new', function (req, res, next) {
  const { session } = req;
  res.status(200).render('newVote', { user: session.user });
});

router.post('/new', function (req, res, next) {
  const { body, session } = req;

  console.log(body);
  console.log(session);

  res.status(200).json({ body });
});

module.exports = router;
