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
      created_at: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
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
        allowNull: false,
      },
      as: 'card',
      onDelete: 'CASCADE',
    });
    history.belongsTo(models['User'], {
      foreignKey: {
        allowNull: false,
      },
      as: 'user',
      onDelete: 'CASCADE',
    });
    history.belongsTo(models['Type'], {
      foreignKey: {
        allowNull: false,
      },
      as: 'type',
      onDelete: 'CASCADE',
    });
  };
  return history;
};
