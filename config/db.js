const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('NEGOCIO', 'Sheyla', 'Troya_123!', {
    dialect: 'mssql',
    host: 'localhost'
  });
module.exports = sequelize;