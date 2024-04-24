const { Player } = require('../models');
const { PlayerMessages } = require('../messages/playerMessages');
const { statusCodes } = require('../messages/statusCodes');

module.exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll();
    if (!players || players.length === 0) {
      return res
        .status(statusCodes.NO_CONTENT)
        .json({ message: PlayerMessages.CANNOT_GET_PLAYERS });
    }
    res.status(statusCodes.OK).json(players);
  } catch (error) {
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports.addNewPlayer = async (req, res) => {
  try {
    const newPlayer = req.body;
    if (
      !newPlayer.ign ||
      !newPlayer.profileID ||
      !newPlayer.role ||
      !newPlayer.mainHero ||
      !newPlayer.highestRank
    ) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: PlayerMessages.ALL_FIELDS_ARE_REQUIRED });
    }
    const createdPlayer = await Player.create(newPlayer);
    res.status(statusCodes.CREATED).json({
      message: PlayerMessages.PLAYER_ADDED_SUCCESSFULLY,
      createdPlayer,
    });
  } catch (error) {
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports.getPlayerByID = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: PlayerMessages.PLAYER_NOT_FOUND });
    }
    res.status(statusCodes.OK).json(player);
  } catch (error) {
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    const { ign, profileID, role, mainHero, highestRank } = req.body;
    if (!player) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: PlayerMessages.PLAYER_NOT_FOUND });
    }
    if (!ign || !profileID || !role || !mainHero || !highestRank) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .json({ message: PlayerMessages.ALL_FIELDS_ARE_REQUIRED });
    }
    const updatedPlayer = await player.update({
      ign,
      profileID,
      role,
      mainHero,
      highestRank,
    });
    res.status(statusCodes.OK).json({
      message: PlayerMessages.PLAYER_UPDATED_SUCCESSFULLY,
      updatedPlayer,
    });
  } catch (error) {
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.id);
    if (!player) {
      return res
        .status(statusCodes.NOT_FOUND)
        .json({ message: PlayerMessages.PLAYER_NOT_FOUND });
    }
    await player.destroy();
    res
      .status(statusCodes.OK)
      .json({ message: PlayerMessages.PLAYER_DELETED_SUCCESSFULLY });
  } catch (error) {
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
