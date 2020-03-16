import express from 'express';

const router = express.Router();

router.get('/:id', (req, res) => {
  res.render('votingDetail');
});

export default router;
