'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notificacoes = sequelize.define('Notificacoes', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    situacao: {
      allowNull:false,
      type: DataTypes.ENUM,
      values: ['Criado', 'Editado', 'Deletado']
    },
    
  }, {});
  Notificacoes.associate = function(models) {
    // associations can be defined here
  };
  return Notificacoes;
};