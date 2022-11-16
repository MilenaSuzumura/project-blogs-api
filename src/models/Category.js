const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING
  });
  return category;
};