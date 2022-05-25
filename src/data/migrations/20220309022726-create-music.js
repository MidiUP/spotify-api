'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('music',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        album: {
          type: Sequelize.STRING,
          allowNull: false
        },
        artist: {
          type: Sequelize.STRING,
          allowNull: false
        },
        thumb: {
          type: Sequelize.STRING,
          allowNull: false
        }
      });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('music');

  }
};
