'use strict';
var bcrypt = require('bcrypt');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync('password', salt);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Onyekachi',
      email: 'onyekachi@kachi.com',
      password: hash,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Onyekachi',
      email: 'wilson@kachi.com',
      password: hash,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
