'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Centers', [{
      name: 'Centerrry',
      detail: 'We exist',
      image: 'ramsey.jpg',
      address: 'somewhere in lagos',
      chairs: 10,
      projector: 1,
      capacity: 1000,
      state: 'state',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Second Centerrry',
      detail: 'We exist',
      image: 'ramsey.jpg',
      address: 'somewhere in lagos',
      chairs: 10,
      projector: 1,
      capacity: 1000,
      state: 'state',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Third Centerrry',
      detail: 'We exist',
      image: 'ramsey.jpg',
      address: 'somewhere in lagos',
      chairs: 10,
      projector: 1,
      capacity: 1000,
      state: 'state',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Fourth Centerrry',
      detail: 'We exist',
      image: 'ramsey.jpg',
      address: 'somewhere in lagos',
      chairs: 10,
      projector: 1,
      capacity: 1000,
      state: 'state',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Fifth Centerrry',
      detail: 'We exist',
      image: 'ramsey.jpg',
      address: 'somewhere in lagos',
      chairs: 10,
      projector: 1,
      capacity: 1000,
      state: 'state',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sixth Centerrry',
      detail: 'We exist',
      image: 'ramsey.jpg',
      address: 'somewhere in lagos',
      chairs: 10,
      projector: 1,
      capacity: 1000,
      state: 'state',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Seventh Centerrry',
      detail: 'We exist',
      image: 'ramsey.jpg',
      address: 'somewhere in lagos',
      chairs: 10,
      projector: 1,
      capacity: 1000,
      state: 'state',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Eigth Centerrry',
      detail: 'We exist',
      image: 'ramsey.jpg',
      address: 'somewhere in lagos',
      chairs: 10,
      projector: 1,
      capacity: 1000,
      state: 'state',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ninth Centerrry',
      detail: 'We exist',
      image: 'ramsey.jpg',
      address: 'somewhere in lagos',
      chairs: 10,
      projector: 1,
      capacity: 1000,
      state: 'state',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Centers', null, {});
  }
};
