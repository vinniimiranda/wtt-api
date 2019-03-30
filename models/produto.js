'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    nome: {
      type: DataTypes.STRING,
      allowNull:false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull:false
    },
  
  }, {});
  Produto.associate = function(models) {
    // associations can be defined here
  };
  return Produto;
};