const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    post_id: { 
      foreignKey: true,
      type: DataTypes.INTEGER
    },
    category_id: { 
      foreignKey: true,
      type: DataTypes.INTEGER
    },
  }, {
    timestamps: false,
    tableName: 'posts_categories',
  });

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,
      {
        foreignKey: 'category_id',
        as: 'categories',
        otherKey: 'post_id',
        through: postCategory,
      });

      models.Category.belongsToMany(models.BlogPost,
        {
          foreignKey: 'post_id',
          as: 'blog_posts',
          otherKey: 'category_id',
          through: postCategory,
        });
  };

  return postCategory;
};
