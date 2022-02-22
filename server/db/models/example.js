const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('example', {
  name: Sequelize.STRING
});