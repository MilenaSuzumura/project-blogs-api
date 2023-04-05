'use strict';

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'categories',
  });
  return category;
};
