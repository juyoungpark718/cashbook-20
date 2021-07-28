module.exports = function (sequelize, DataTypes) {
  const user = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      profileUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );
  user.associate = function (models) {
    user.hasMany(models['Card'], {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    user.hasMany(models['History'], {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };
  return user;
};
