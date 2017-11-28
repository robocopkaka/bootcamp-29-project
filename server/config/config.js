var dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'event-manager-dev',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_USER,
    database: 'event-manager-test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    dialect: 'postgres'
  }
};
