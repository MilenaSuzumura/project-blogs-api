module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    id: {
      autoIncrement: true,
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

  UserModel.associate = (models) => {
    UserModel.hasMany(models.BlogPost, {
      as: 'blog_posts',
      foreignKey: 'userId'
    });
  }

  return UserModel;
};
