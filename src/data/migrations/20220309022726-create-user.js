'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('users',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        }
      });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('users');

  }
};
