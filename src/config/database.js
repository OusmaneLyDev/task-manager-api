const { Sequelize } = require('sequelize');
require('dotenv').config(); // Vérifiez bien que ce module est correctement installé

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

module.exports = sequelize;
