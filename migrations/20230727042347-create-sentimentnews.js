'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sentimentnews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING,
        unique : true,
      },
      isi: {
        type: Sequelize.STRING
      },
      tanggal: {
        type: Sequelize.DATE
      },
      sentimen: {
        type: Sequelize.STRING
      },
      skor: {
        type: Sequelize.INTEGER
      },
      sumber: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sentimentnews');
  }
};