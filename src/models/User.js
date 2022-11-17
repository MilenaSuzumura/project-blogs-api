'use strict';

const UserSchema = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  return UserModel;
};

module.exports = UserSchema;