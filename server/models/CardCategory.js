module.exports = function (sequelize, DataTypes) {
  const cardCategory = sequelize.define(
    'CardCategory',
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
  cardCategory.associate = function (models) {
    cardCategory.hasMany(models['Card'], {
      foreignKey: {
        name: 'cardCategoryId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };
  return cardCategory;
};
