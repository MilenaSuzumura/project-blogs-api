'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts_categories', { 
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
            model: 'blog_posts',
            key: 'id'
          }
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        }
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('posts_categories');
  }
};
