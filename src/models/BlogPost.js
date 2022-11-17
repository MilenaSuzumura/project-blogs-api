/* const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
    tableName: 'blog_posts',
  });

  BlogPost.associate = (models) => [
    models.BlogPost.belongsToMany(models.User, {
      as: 'users',
      through: BlogPost,
      foreignKey: 'post_id',
      otherKey: 'user_id', 
    });

    models.User.belongsToMany(models.BlogPost, {
      as: 'blog_post',
      through: UserBook,
      foreignKey: 'userId',  // se refere ao id de User na tabela de `users_books`
      otherKey: 'bookId',
    });
  ]
  return category;
}; */
