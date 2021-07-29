module.exports = function (sequelize, DataTypes) {
  const type = sequelize.define(
    'Type',
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
  type.associate = function (models) {
    type.hasMany(models['History'], {
      foreignKey: {
        name: 'typeId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };
  return type;
};
