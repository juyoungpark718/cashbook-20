module.exports = function (sequelize, DataTypes) {
  const card = sequelize.define(
    'Card',
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );
  card.associate = function (models) {
    card.belongsTo(models['User'], {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      as: 'user',
      onDelete: 'CASCADE',
    });
    card.belongsTo(models['CardCategory'], {
      foreignKey: {
        name: 'cardCategoryId',
        allowNull: false,
      },
      as: 'cardCategory',
      onDelete: 'CASCADE',
    });
    card.hasMany(models['History'], {
      foreignKey: {
        name: 'cardId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };
  return card;
};
