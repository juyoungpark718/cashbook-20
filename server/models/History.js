const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  const history = sequelize.define(
    'History',
    {
      content: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.literal(`(CURRENT_DATE)`),
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );
  history.associate = function (models) {
    history.belongsTo(models['Card'], {
      foreignKey: {
        name: 'cardId',
        allowNull: false,
      },
      as: 'card',
      onDelete: 'CASCADE',
    });
    history.belongsTo(models['User'], {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'user',
      onDelete: 'CASCADE',
    });
    history.belongsTo(models['Type'], {
      foreignKey: {
        name: 'typeId',
        allowNull: false,
      },
      as: 'type',
      onDelete: 'CASCADE',
    });
  };
  return history;
};
