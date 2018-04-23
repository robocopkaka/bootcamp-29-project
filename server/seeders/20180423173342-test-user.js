'use strict';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const password = bcrypt.hashSync('onyekachi', salt);

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'John',
      email: 'demo@demo.com',
      password
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
