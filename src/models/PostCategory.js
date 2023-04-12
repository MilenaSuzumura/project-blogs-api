module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
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
        through: postCategory,
      });

      models.Category.belongsToMany(models.BlogPost,
        {
          foreignKey: 'postId',
          as: 'categories',
          through: postCategory,
        });
  };

  return postCategory;
};
