const express = require('express');
const router = express.Router();

const {
  getAllPlayers,
  addNewPlayer,
  getPlayerByID,
  updatePlayer,
  deletePlayer,
} = require('../controllers/playerController');

router.get('/', getAllPlayers);
router.post('/add-new-player', addNewPlayer);
router.get('/:id', getPlayerByID);
router.put('/update-player/:id', updatePlayer);
router.delete('/:id', deletePlayer);

module.exports = router;
