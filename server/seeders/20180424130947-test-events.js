'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [{
      name: 'cn nfwkfnwknf',
      date: '2020-01-01',
      detail: 'Awesome event',
      guests: 1000,
      categoryId: 1,
      centerId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
