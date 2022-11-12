'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts_categories', { 
      post_id: {
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('posts_categories');
  }
};
