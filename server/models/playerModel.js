module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    ign: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mainHero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    highestRank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Player;
};
