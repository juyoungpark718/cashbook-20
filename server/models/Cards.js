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
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    card.belongsTo(models['CardCategory'], {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    card.hasMany(models['History'], {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };
  return card;
};
