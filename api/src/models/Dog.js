const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
  
      },
      name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
      
      },
      height:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
        
      },
      weight:{
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          notEmpty: true
      }
        
      },
      life_span:{
        type: DataTypes.STRING,
        allowNull: true, 
        
      },
      image:{
      type: DataTypes.STRING(100000),
          
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
  
      }
    });
};
