module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    tableName: 'posts_categories',
    underscored: true,
  });

  postCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category,
      {
        foreignKey: 'postId',
        as: 'categories',
        otherKey: 'categoryId',
        through: postCategory,
      });

      models.Category.belongsToMany(models.BlogPost,
        {
          foreignKey: 'postId',
          as: 'blogPosts',
          otherKey: 'postId',
          through: postCategory,
        });
  };

  return postCategory;
};
