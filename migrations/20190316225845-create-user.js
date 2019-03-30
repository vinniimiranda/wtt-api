'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        allowNull:false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull:false,
        unique:true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull:false,
        type: Sequelize.STRING,
      },
      situacao: {
        allowNull:false,
        type: Sequelize.ENUM,
        values: ['Inativo', 'Ativo']
      },
      tipo: {
        allowNull:false,
        type: Sequelize.ENUM,
        values: ['Admin', 'Usuario']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};