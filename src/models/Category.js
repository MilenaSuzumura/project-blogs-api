const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'Categories',
  });
  return category;
};