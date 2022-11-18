'use strict';

module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: { 
      foreignKey: true,
      type: DataTypes.INTEGER
    },
    categoryId: { 
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
        foreignKey: 'categoryId',
        as: 'categories',
        otherKey: 'postId',
        through: postCategory,
      });

      models.Category.belongsToMany(models.BlogPost,
        {
          foreignKey: 'postId',
          as: 'posts',
          otherKey: 'categoryId',
          through: postCategory,
        });
  };

  return postCategory;
};
