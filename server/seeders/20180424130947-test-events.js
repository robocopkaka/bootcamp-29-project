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
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'First event',
      date: '2020-01-02',
      detail: 'Awesome event',
      guests: 1000,
      categoryId: 1,
      centerId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Second event',
      date: '2020-01-03',
      detail: 'Awesome event',
      guests: 1000,
      categoryId: 1,
      centerId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Third event',
      date: '2020-01-04',
      detail: 'Awesome event',
      guests: 1000,
      categoryId: 1,
      centerId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Fourth event',
      date: '2020-01-05',
      detail: 'Awesome event',
      guests: 1000,
      categoryId: 1,
      centerId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Fifth event',
      date: '2020-01-06',
      detail: 'Awesome event',
      guests: 1000,
      categoryId: 1,
      centerId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sixth event',
      date: '2020-01-07',
      detail: 'Awesome event',
      guests: 1000,
      categoryId: 1,
      centerId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Seventh event',
      date: '2020-01-08',
      detail: 'Awesome event',
      guests: 1000,
      categoryId: 1,
      centerId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Eigth event',
      date: '2020-01-09',
      detail: 'Awesome event',
      guests: 1000,
      categoryId: 1,
      centerId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ninth event',
      date: '2020-01-10',
      detail: 'Awesome event',
      guests: 1000,
      categoryId: 1,
      centerId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Tenth event',
      date: '2020-01-11',
      detail: 'Awesome event',
      guests: 1000,
      categoryId: 1,
      centerId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Eleventh event',
      date: '2020-01-12',
      detail: 'Awesome event',
      guests: 1000,
      categoryId: 1,
      centerId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
