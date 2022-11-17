/* const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('PostCategory', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING
  });
  return category;
};

'posts_categories', { 
  post_id: {
    type: Sequelize.INTEGER
  },
  category_id: {
    type: Sequelize.INTEGER
  } */