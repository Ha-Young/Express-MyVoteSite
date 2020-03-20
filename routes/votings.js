const express = require('express');
const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
  showCreateVoting,
  checkVaildInput,
  createVoting,
  showVoting,
  voting,
  deleteVoting
} = require('../controllers/votingsController');

router.get('/new', auth, showCreateVoting);
router.post('/new', auth, checkVaildInput, createVoting);

router.get('/:id', showVoting);
router.post('/:id', auth, voting);
router.delete('/:id', auth, deleteVoting);

module.exports = router;
