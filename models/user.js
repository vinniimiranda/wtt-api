'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
      type: DataTypes.INTEGER
    },
    nome: {
      allowNull:false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull:false,
      unique:true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull:false,
      type: DataTypes.STRING,
    },
        
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};